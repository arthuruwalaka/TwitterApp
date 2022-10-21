from rest_framework import serializers
from . import models

# Cal_event
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TwitterUser
        fields = ["id", "name", "username"]
