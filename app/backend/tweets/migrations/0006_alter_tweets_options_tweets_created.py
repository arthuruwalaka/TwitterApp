# Generated by Django 4.1.2 on 2023-03-07 20:17

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("tweets", "0005_rename_profile_image_tweets_image"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="tweets",
            options={"ordering": ["created"]},
        ),
        migrations.AddField(
            model_name="tweets",
            name="created",
            field=models.DateTimeField(
                auto_now_add=True, db_index=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]
