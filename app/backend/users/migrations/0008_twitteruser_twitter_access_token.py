# Generated by Django 4.1.2 on 2022-12-15 03:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0007_twitteraccesstoken"),
    ]

    operations = [
        migrations.AddField(
            model_name="twitteruser",
            name="twitter_access_token",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="users.twitteraccesstoken",
            ),
        ),
    ]
