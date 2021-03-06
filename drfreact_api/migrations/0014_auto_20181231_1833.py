# Generated by Django 2.1 on 2018-12-31 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drfreact_api', '0013_auto_20181230_1617'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='message',
            name='linkedin_profile',
            field=models.URLField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='message',
            name='website',
            field=models.URLField(blank=True, max_length=250, null=True),
        ),
    ]
