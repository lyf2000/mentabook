from datetime import timedelta

from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.timezone import localtime
from .models import Event


@shared_task
def remind_event(id):
    print('ID', id)
    try:
        print(Event.objects.all())
        event = Event.objects.get(id=id)
    except Event.DoesNotExist:
        print('exc')
        return False

    mail_subject = 'MEETIIIING AAAAA.'
    context = {
        'username': event.author.username,
        'date': event.date.strftime('%Y-%m-%d %H:%M'),
        'title': event.title,
        'text': event.text
    }
    send_message('events/meeting_remind.html', context, mail_subject, event.author.email)
    event.delete()


def send_message(template_name, message_context, mail_subject, to_email):
    message = render_to_string(template_name, message_context)
    msg = EmailMultiAlternatives(mail_subject, '', '', [to_email])
    msg.attach_alternative(message, "text/html")
    return msg.send()
