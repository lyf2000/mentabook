from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Event
from .serializers import EventSerializer
from .filters import EventFilter
from django_filters import rest_framework as filters
from .paginators import MyPaginator
from .tasks import send_message


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_class = EventFilter
    pagination_class = MyPaginator
    permission_classes = [permissions.IsAuthenticated, ]

    def get_queryset(self, *args, **kwargs):
        return Event.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user).add_reminder()
        

    def perform_update(self, serializer):
        old_date = serializer.instance.date
        event = serializer.save()
        if event.check_date_changed(old_date):
            event.date_changed()
