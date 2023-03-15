from django.db import models

# Create your models here.


class Media(models.Model):
    id = models.CharField(primary_key=True, max_length=64)
    type = models.CharField(max_length=64, default=None)
    url = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.url


class Tweets(models.Model):
    id = models.CharField(primary_key=True, max_length=64)
    url = models.CharField(max_length=255)
    text = models.CharField(max_length=300)
    is_media = models.BooleanField(max_length=64, default=False)
    media_urls = models.ManyToManyField(Media)
    username = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    protected = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    created = models.DateTimeField(
        auto_now_add=True, db_index=True, null=True, blank=True
    )

    class Meta:
        ordering = [
            "created",
        ]

    def __str__(self) -> str:
        return self.text
