from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from .serializers import UserCreateSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserCreateAPIView(CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserCreateSerializer


# TODO transport by logic
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(MyTokenObtainPairSerializer, self).validate(attrs)

        data.update({'username': self.user.username})

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
