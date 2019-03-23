from django.db import models
from django.contrib.auth import get_user_model

from django.conf import settings

from django.db.models.signals import post_save
User = get_user_model()



class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # custom fields for user
    website = models.URLField(blank=True, default="")
    about = models.CharField(max_length=255, blank=True, default="")
    avatar = models.ImageField(upload_to="static/images", blank=True, null=True)

def create_user_profile(sender, instance, created, **kwargs):
    """Creates a UserProfile Object Whenever a User Object is Created"""
    if created:
        profile = UserProfile.objects.create(user=instance)
        profile.save()

post_save.connect(create_user_profile, sender=User)

