# Generated by Django 4.1.2 on 2022-12-17 04:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0008_twitteruser_twitter_access_token"),
    ]

    operations = [
        migrations.AddField(
            model_name="twitteraccesstoken",
            name="refresh_token",
            field=models.CharField(max_length=255, null=True),
        ),
    ]
