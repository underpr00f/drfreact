# Generated by Django 2.1 on 2019-01-10 23:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('drfreact_api', '0017_auto_20190110_2306'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payments',
            name='message',
        ),
        migrations.AddField(
            model_name='message',
            name='payments',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='message_payments', to='drfreact_api.Payments'),
        ),
    ]
