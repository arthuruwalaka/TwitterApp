from rest_framework import serializers
from . import models

# Cal_event
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TwitterUser
        fields = ["id", "name", "username", "profile_image_url"]


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TwitterFollowers
        fields = ["id", "name", "username", "profile_image_url"]


class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TwitterFollowing
        fields = ["id", "name", "username", "profile_image_url"]
