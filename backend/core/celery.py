import os
from datetime import timedelta

from celery import Celery, shared_task

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')

app = Celery('backend.core')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.update(
    result_expires = timedelta(seconds=15),
)


@shared_task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))