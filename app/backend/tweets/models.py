from django.db import models

# Create your models here.


class Tweets(models.Model):
    id = models.CharField(primary_key=True, max_length=64)
    url = models.CharField(max_length=300)
    text = models.CharField(max_length=300)
    is_media = models.BooleanField(max_length=64)


class Media(models.Model):
    tweet = models.ForeignKey(Tweets, on_delete=models.CASCADE)
    url = models.CharField(max_length=300)
