from rest_framework import serializers
from .models import Item, Message
from user_profile.serializers import UserSerializer

class ItemSerializer(serializers.HyperlinkedModelSerializer):
	# current_user = serializers.SerializerMethodField('_user')
	# # Use this method for the custom field
	# def _user(self, obj):
	# 	# request = getattr(self.context, 'request', None)
	# 	# if request:
	# 	return self.context['request'].user

	class Meta:
		model = Item
		fields = 'id','title', 'description', 'image', 'slug', 
		read_only_fields = ['id']
	# def create(self, validated_data):
	# 	# Create the Foo instance
	# 	foo = Item.objects.create(title=validated_data['title'])
	# 	return foo
	# def update(self, instance, validated_data):
	# 	# Update the Foo instance
	# 	instance.title = validated_data['title']
	# 	instance.save()
	# 	return instance
	def update(self, instance, validated_data):
		# profile_data = validated_data.pop('profile')
		# Unless the application properly enforces that this field is
		# always set, the follow could raise a `DoesNotExist`, which
		# would need to be handled.
		# profile = instance.profile
		instance.title = validated_data.get('title', instance.title)
		instance.description = validated_data.get('description', instance.description)
		instance.image = validated_data.get('image', instance.image)
		instance.slug = validated_data.get('slug', instance.slug)
		instance.save()

		# profile.is_premium_member = profile_data.get(
		#     'is_premium_member',
		#     profile.is_premium_member
		# )
		# profile.has_support_contract = profile_data.get(
		#     'has_support_contract',
		#     profile.has_support_contract
		#  )
		# profile.save()

		return instance

class MessageSerializer(serializers.ModelSerializer):
	#owner = UserSerializer(many=True, read_only=True)
	status = serializers.ChoiceField(choices=Message.STATUS_CHOICES)
	#status = serializers.CharField(source='get_status_display')
	class Meta:
		model = Message
		fields = 'id', 'text', 'created_at', 'owner', 'phone', 'status',


# class UserSerializer(UserDetailsSerializer):
#     #print(self.context['request'])
#     website = serializers.URLField(source="userprofile.website", allow_blank=True, required=False)
#     about = serializers.CharField(source="userprofile.about", allow_blank=True, required=False)

#     class Meta(UserDetailsSerializer.Meta):
#         fields = UserDetailsSerializer.Meta.fields + ('website', 'about')

#     def update(self, instance, validated_data):
#         profile_data = validated_data.pop('userprofile', {})
#         website = profile_data.get('website')
#         about = profile_data.get('about')

#         instance = super(UserSerializer, self).update(instance, validated_data)

#         # get and update user profile
#         profile = instance.userprofile

#         if profile_data:
#             if website:
#                 profile.website = website
#             if about:
#                 profile.about = about
#             profile.save()
#         return instance