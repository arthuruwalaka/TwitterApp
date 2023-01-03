from unittest.util import _MAX_LENGTH
from django.db import models
from tweets.models import Tweets

# Create your models here.


# class TwitterAuthToken(models.Model):
#     oauth_token = models.CharField(max_length=255)
#     oauth_token_secret = models.CharField(max_length=255)

#     def __str__(self):
#         return self.oauth_token


class TwitterAccessToken(models.Model):
    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.access_token


class TwitterUser(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    profile_image_url = models.CharField(max_length=255, null=True)
    # twitter_oauth_token = models.ForeignKey(TwitterAuthToken, on_delete=models.CASCADE)
    twitter_access_token = models.ForeignKey(
        TwitterAccessToken, on_delete=models.CASCADE, null=True
    )
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    bookmarks = models.ManyToManyField(Tweets)
    first_bookmark = models.CharField(max_length=64, null=True)

    def __str__(self):
        return self.username


class TwitterFollowers(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    profile_image_url = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(
        TwitterUser, on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.username


class TwitterFollowing(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    profile_image_url = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(
        TwitterUser, on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.username
