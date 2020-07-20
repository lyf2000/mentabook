from rest_framework import viewsets, generics
from .models import Event
from .serializers import EventSerializer
from .filters import EventFilter
from django_filters import rest_framework as filters


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_class = EventFilter
