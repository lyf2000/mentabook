from rest_framework import serializers
from .models import Event
from django.utils.timezone import localtime
from datetime import datetime, timedelta

class EventSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault())
    date = serializers.DateTimeField(format='%b %d, %H:%M')
    updated = serializers.DateTimeField(format='%b %d, %H:%M', read_only=True)
    created = serializers.DateTimeField(format='%b %d', read_only=True)

    def __init__(self, *args, **kwargs):

        # TODO determine either list or eiter detail
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)
        # a = self.context['request']
        # self.fields.pop('date')
        

    class Meta:
        model = Event
        fields = ('id', 'title', 'text', 'date', 'created', 'updated', 'author')

    def validate_date(self, value):
        if value - timedelta(hours=1) < localtime():
            raise serializers.ValidationError('LESS THAN ! HOUR!!!')
        return value
