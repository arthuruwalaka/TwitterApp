# Generated by Django 4.1.2 on 2023-03-13 23:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("tweets", "0006_alter_tweets_options_tweets_created"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="tweets",
            options={"ordering": ["-created"]},
        ),
    ]
