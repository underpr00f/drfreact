from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer
from .models import UserProfile
from django.contrib.auth import get_user_model


class UserSerializer(UserDetailsSerializer):
    website = serializers.URLField(source="userprofile.website", allow_blank=True, allow_null=True, required=False)
    about = serializers.CharField(source="userprofile.about", allow_blank=True, allow_null=True, required=False)
    avatar = serializers.ImageField(source="userprofile.avatar", required=False)

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('website', 'about', 'avatar')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        website = profile_data.get('website')
        about = profile_data.get('about')
        avatar = profile_data.get('avatar')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile

        if profile_data:
            if website:
                profile.website = website
            else:
                profile.website = ""
            if about:
                profile.about = about
            else:
                profile.about = ""
            if avatar:
                profile.avatar = avatar
            else:
                profile.avatar = ""
            profile.save()
        return instance
# from rest_framework import serializers
# #from rest_auth.serializers import HyperlinkedModelSerializer
# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     website = serializers.URLField(source="userprofile.website", allow_blank=True, required=False)
#     about = serializers.CharField(source="userprofile.about", allow_blank=True, required=False)
#     username = serializers.CharField(required=False, allow_blank=True, read_only=True)

#     class Meta:
#         model = User
#         fields = (
#             'username',
#             'first_name',
#             'last_name',
#             'email',
#             'website',
#             'about',
#             )

#     def create(self, validated_data):
#         profile_data = validated_data.pop('userprofile', None)
#         user = super(UserSerializer, self).create(validated_data)
#         self.update_or_create_profile(user, profile_data)
#         return user
#     def update(self, instance, validated_data):
#         profile_data = validated_data.pop('userprofile', None)
#         self.update_or_create_profile(instance, profile_data)
#         return super(UserSerializer, self).update(instance, validated_data)
#     def update_or_create_profile(self, user, profile_data):
#         # This always creates a Profile if the User is missing one;
#         # change the logic here if that's not right for your app
#         UserProfile.objects.update_or_create(user=user, defaults=profile_data)