from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from .serializers import UserCreateSerializer


class UserCreateAPIView(CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserCreateSerializer
