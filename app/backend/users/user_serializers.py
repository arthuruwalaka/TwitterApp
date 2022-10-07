from rest_framework import serializers
from . import models

# Cal_event
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "name", "username"]
