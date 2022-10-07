from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.
class User(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
