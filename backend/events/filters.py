from django_filters import rest_framework as filters
from .models import Event


class EventFilter(filters.FilterSet):
    text = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Event
        fields = ['text', ]
