# Generated by Django 2.1 on 2019-01-20 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drfreact_api', '0021_remove_payments_lead_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='last_call',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]