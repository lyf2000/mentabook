from .celery import app as celery_app
import django

from django.core.management import call_command
from django.db.utils import OperationalError
try:
    django.setup()
    call_command("makemigrations", interactive=False)
    call_command("migrate", interactive=False)
except OperationalError as exc:
    print("Couldn't apply migrations:", exc)

__all__ = ('celery_app', )