from django.db import models
from datetime import timedelta
from celery.task.control import revoke


class Event(models.Model):
    author = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='events')

    title = models.CharField(max_length=128)
    text = models.CharField(max_length=512)
    date = models.DateTimeField()
 
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

# TODO go all to create

    def delete(self, *args, **kwargs):
        reminder = self.revoke_reminder()
        reminder.delete()
        super(Event, self).delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        super(Event, self).save(*args, **kwargs)
        self.add_reminder()

    def add_reminder(self):
        from .tasks import remind_event
        task = remind_event.apply_async((self.id,), eta=self.date - timedelta(hours=1))
        self.add_event_reminder_task(task.id)

    def add_event_reminder_task(self, task_id):
        EventReminderTask.objects.update_or_create(event=self, defaults={'task_id': task_id})

    def date_changed(self):
        self.revoke_reminder()
        self.add_reminder()

    def revoke_reminder(self):
        # TODO простите ошибка на сервере
        reminder = EventReminderTask.objects.get(event=self)
        revoke(reminder.task_id, terminate=True)
        return reminder

    def check_date_changed(self, old_date):
        if self.date == old_date:
            return False
        return True


class EventReminderTask(models.Model):
    task_id = models.CharField(max_length=128, unique=True)
    event = models.OneToOneField('Event', on_delete=models.CASCADE)
