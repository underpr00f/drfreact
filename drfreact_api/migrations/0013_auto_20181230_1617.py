# Generated by Django 2.1 on 2018-12-30 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drfreact_api', '0012_message_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='linkedin_profile',
            field=models.URLField(blank=True, default='http://example.com', max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='message',
            name='website',
            field=models.URLField(blank=True, default='https://www.linkedin.com/in/example/', max_length=250, null=True),
        ),
    ]
