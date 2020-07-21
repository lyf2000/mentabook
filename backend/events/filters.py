from django_filters import rest_framework as filters
from .models import Event
from django.utils.timezone import localtime
from datetime import datetime, timedelta

def day(qs):
    now = localtime()
    to = timedelta(days=1) + localtime()
    return qs.filter(date__range=[now, to]) 

def all(qs):
    return qs


class EventFilter(filters.FilterSet):
    text = filters.CharFilter(lookup_expr='icontains')

    DATE_CHOICES = {
        'all': all,
        'day': day,
    }

    date =  filters.CharFilter(method='filter_date')

    class Meta:
        model = Event
        fields = ['text', 'date', ]

    # TODO accomplish
    def filter_date(self, queryset, name, value):
        a = self.DATE_CHOICES.get(value, all)(queryset)
        return a
