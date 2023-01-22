from rest_framework import serializers
from . import models


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Media
        fields = ["id", "url", "type"]


class TweetSerializer(serializers.ModelSerializer):
    media_urls = MediaSerializer(read_only=True, many=True)

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
