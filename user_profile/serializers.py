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
    
    # def validate(self, data):
    #     print("self", self)
    #     print("data", data)
    #     unknown_keys = set(self.initial_data.keys()) - set(self.fields.keys())
    #     print(unknown_keys)
    #     if unknown_keys:
    #         raise ValidationError("Got unknown fields: {}".format(unknown_keys))
    #     return data


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
            # else:
            #     profile.avatar = ""
            profile.save()
        return instance
