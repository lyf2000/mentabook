from django.db import models
from datetime import timedelta


class Event(models.Model):
    author = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='events')

    title = models.CharField(max_length=128)
    text = models.CharField(max_length=512)
    date = models.DateTimeField()
 
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def add_reminder(self):
        from .tasks import remind_event
        remind_event.apply_async((self.id,), eta=self.date - timedelta(hours=1))

    def revoke_reminder(self):
        pass


class EventReminderTask(models.Model):
    task_id = models.CharField(max_length=128, unique=True)
    event = models.OneToOneField('Event', on_delete=models.CASCADE)
