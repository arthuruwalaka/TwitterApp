# Generated by Django 4.1.2 on 2023-01-02 21:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0010_twitteruser_first_bookmark"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="twitteruser",
            name="twitter_oauth_token",
        ),
        migrations.DeleteModel(
            name="TwitterAuthToken",
        ),
    ]
