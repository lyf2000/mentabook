from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format='%b %d, %H:%M')
    updated = serializers.DateTimeField(format='%b %d, %H:%M')
    created = serializers.DateTimeField(format='%b %d')

    def __init__(self, *args, **kwargs):

        # TODO determine either list or eiter detail
        super(serializers.ModelSerializer, self).__init__(*args, **kwargs)
        # a = self.context['request']
        # self.fields.pop('date')
        

        

    class Meta:
        model = Event
        fields = ('id', 'title', 'text', 'date', 'created', 'updated', )
