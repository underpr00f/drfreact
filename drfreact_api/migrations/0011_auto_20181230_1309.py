# Generated by Django 2.1 on 2018-12-30 13:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('drfreact_api', '0010_auto_20181230_1306'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='corporate_investor',
            new_name='is_corporate',
        ),
    ]