from unittest.util import _MAX_LENGTH
from django.db import models
from tweets.models import Tweets
from django.db.models.signals import m2m_changed
from django.dispatch import receiver


# Create your models here.


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
    twitter_access_token = models.ForeignKey(
        TwitterAccessToken, on_delete=models.CASCADE, null=True, related_name="user"
    )
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    bookmarks = models.ManyToManyField(Tweets)
    first_bookmark = models.CharField(max_length=64, null=True)

    def __str__(self):
        return self.username


@receiver(m2m_changed, sender=TwitterUser.bookmarks.through)
def delete_old_bookmarks(sender, **kwargs):
    if kwargs["action"] == "post_remove":
        Tweets.objects.filter(pk__in=kwargs["pk_set"], files_set=None).delete()
