# Generated by Django 2.1 on 2018-10-27 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drfreact_api', '0006_message_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='status',
            field=models.CharField(blank=True, choices=[(1, 'Candidate'), (2, 'Processed'), (3, 'Converted'), (4, 'Rejected')], default=1, max_length=10, null=True),
        ),
    ]
