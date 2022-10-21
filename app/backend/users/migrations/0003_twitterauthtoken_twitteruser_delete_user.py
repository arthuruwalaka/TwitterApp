# Generated by Django 4.1.2 on 2022-10-12 22:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("users", "0002_rename_user_id_user_id_rename_user_at_user_name_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="TwitterAuthToken",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("oauth_token", models.CharField(max_length=255)),
                ("oauth_token_secret", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="TwitterUser",
            fields=[
                (
                    "id",
                    models.CharField(max_length=255, primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=255)),
                ("username", models.CharField(max_length=255)),
                ("profile_image_url", models.CharField(max_length=255, null=True)),
                (
                    "twitter_oauth_token",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="users.twitterauthtoken",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="User",
        ),
    ]
