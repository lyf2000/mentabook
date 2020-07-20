from django.db import models


class Event(models.Model):
    author = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='events')

    title = models.CharField(max_length=128)
    text = models.CharField(max_length=512)
    date = models.DateTimeField()
 
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
