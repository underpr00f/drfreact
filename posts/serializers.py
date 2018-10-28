from django.contrib.auth import get_user_model, authenticate, login, logout
from django.db.models import Q
from django.urls import reverse
from django.utils import timezone

from rest_framework import serializers

from .models import Post

User = get_user_model()

from user_profile.serializers import UserSerializer

# class UserPublicSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(required=False, allow_blank=True, read_only=True)
#     class Meta:
#         model = User
#         fields = [
#             'username',  
#             'first_name',
#             'last_name',
#             ]
    
from rest_framework.fields import CurrentUserDefault
class PostSerializer(serializers.HyperlinkedModelSerializer):
    url             = serializers.HyperlinkedIdentityField(
                            view_name='posts-api:detail',
                            lookup_field='slug'
                            )
    #user            = UserPublicSerializer(read_only=True)
    #user            = UserSerializer(read_only=True)
    #user            = UserSerializer(required=False)
    #user            = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), default=serializers.CurrentUserDefault())

    publish         = serializers.DateField(default=timezone.now())
    owner           = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = [
            'url',
            'slug',
            'user',
            'title',
            'content',
            'draft',
            'publish',
            'updated',
            'owner',
            'timestamp',
        ]

    def get_owner(self, obj):

        request = self.context['request']
        if request.user.is_authenticated:
            if obj.user == request.user:
                return True
        return False
        # user = None
        # request = self.context.get("request")
        # if request and hasattr(request, "user"):
        #     user = request.user


