from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format='%b %d, %H:%M')

    class Meta:
        model = Event
        fields = ('id', 'title', 'text', 'date', )
