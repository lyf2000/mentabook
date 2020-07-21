from .views import EventViewSet
from rest_framework import routers

app_nane = 'events'

router = routers.SimpleRouter()
router.register('events', EventViewSet)


urlpatterns = [
    # path('admin/', admin.site.urls),
    
] + router.urls
