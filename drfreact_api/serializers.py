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
	status = serializers.ChoiceField(choices=Message.STATUS_CHOICES)
	is_corporate = serializers.BooleanField(default=False)
	email = serializers.EmailField()
	linkedin_profile = serializers.URLField()

	class Meta:
		model = Message
		fields = 'id', 'text', 'created_at', 'owner', 'phone', 'status', 'is_corporate', 'email', 'linkedin_profile', 'website'
		extra_kwargs = {'phone': {'required': True}, 
						'text': {'required': True},
						'is_corporate': {'required': True},
						'status': {'required': True},
						'email': {'required': True},
						'linkedin_profile': {'required': True},
						'website': {'required': False},
						} 
	# For validation
	def create(self, validated_data):
		message = Message.objects.create(**validated_data)
		return message
	def update(self, instance, validated_data):
		instance.email = validated_data.get('email', instance.email)
		instance.text = validated_data.get('text', instance.text)
		instance.phone = validated_data.get('phone', instance.phone)
		instance.linkedin_profile = validated_data.get('linkedin_profile', instance.linkedin_profile)
		instance.status = validated_data.get('status', instance.status)
		instance.is_corporate = validated_data.get('is_corporate', instance.is_corporate)
		instance.website = validated_data.get('website', instance.website)
		instance.save()
		return instance
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