from django.db import models
from django.contrib.auth import get_user_model
#from django.contrib.auth.models import AbstractUser

from django.conf import settings

# from django.db.models.signals import pre_save
from django.db.models.signals import post_save
User = get_user_model()



class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # custom fields for user
    website = models.URLField(blank=True, null=True)
    about = models.CharField(max_length=255, blank=True, null=True)

def create_user_profile(sender, instance, created, **kwargs):
    """Creates a UserProfile Object Whenever a User Object is Created"""
    if created:
        UserProfile.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)
# class CustomUser(AbstractUser):
#     name = models.CharField(blank=True, max_length=255)

#     def __str__(self):
#         return self.email
# def pre_save_post_receiver(sender, instance, *args, **kwargs):
# 	pass

# pre_save.connect(pre_save_post_receiver, sender=settings.AUTH_USER_MODEL)