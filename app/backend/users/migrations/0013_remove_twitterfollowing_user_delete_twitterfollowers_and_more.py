# Generated by Django 4.1.2 on 2023-03-14 21:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0012_alter_twitteruser_twitter_access_token"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="twitterfollowing",
            name="user",
        ),
        migrations.DeleteModel(
            name="TwitterFollowers",
        ),
        migrations.DeleteModel(
            name="TwitterFollowing",
        ),
    ]
