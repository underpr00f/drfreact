# Generated by Django 2.1 on 2019-01-19 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drfreact_api', '0019_remove_message_payments'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='is_payed',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
