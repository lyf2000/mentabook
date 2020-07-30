from .views import EventViewSet, m
from rest_framework import routers
from django.urls import path

app_nane = 'events'

router = routers.SimpleRouter()
router.register('events', EventViewSet)


urlpatterns = [
    path('m/', m, name='m'),
    
] + router.urls
