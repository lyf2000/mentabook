from .views import EventViewSet
from rest_framework import routers

app_nane = 'events'

router = routers.SimpleRouter()
router.register('events', EventViewSet)


urlpatterns = [
    
] + router.urls
