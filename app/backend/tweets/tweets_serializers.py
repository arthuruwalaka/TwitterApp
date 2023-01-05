from rest_framework import serializers
from . import models

# Cal_event
class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tweets
        fields = [
            "id",
            "url",
            "text",
            "is_media",
            "media_urls",
            "username",
            "name",
            "image",
            "protected",
            "verified",
        ]
