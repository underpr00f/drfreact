from rest_framework import serializers
from .models import Item, Message, Payments
from user_profile.serializers import UserSerializer
from django.core.exceptions import ValidationError

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
	is_payed = serializers.BooleanField(default=False)
	email = serializers.EmailField()
	linkedin_profile = serializers.URLField()
	# lead_count = serializers.SerializerMethodField()
	# lead_status_count = serializers.SerializerMethodField()

	class Meta:
		model = Message
		fields = 'id', 'text', 'created_at', 'owner', 'phone', 'status', 'is_corporate', 'email', 'linkedin_profile', 'website', 'is_payed',
		extra_kwargs = {'phone': {'required': True}, 
						'text': {'required': True},
						'is_corporate': {'required': True},
						'is_payed': {'required': False},
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
		check_staff=self.context['request'].user.is_staff
		instance.email = validated_data.get('email', instance.email)
		instance.text = validated_data.get('text', instance.text)
		instance.phone = validated_data.get('phone', instance.phone)
		instance.linkedin_profile = validated_data.get('linkedin_profile', instance.linkedin_profile)
		instance.status = validated_data.get('status', instance.status)
		instance.is_corporate = validated_data.get('is_corporate', instance.is_corporate)
		instance.website = validated_data.get('website', instance.website)
		
		#only staff users can edit is_payed to True
		if check_staff:
			if instance.status != "Candidate":
				instance.is_payed = validated_data.get('is_payed', instance.is_payed)
			else:
				instance.is_payed = False
				# raise ValidationError('Cannot update Candidate')

		instance.save()
		return instance
	# def get_lead_count(self, obj):
	# 	lead_count=Message.objects.filter(owner=obj.owner).count()
	# 	# payments = Payments(owner=obj.owner, lead_count=lead_count)
	# 	# payments.save()
	# 	return lead_count
	# def get_lead_status_count(self, obj):
	# 	return Message.objects.filter(owner=obj.owner, status=obj.status).count()

	# payments = Payments(owner=owner, lead_count=lead_count)
	# payments.save()

class PaymentsSerializer(serializers.Serializer):
	
	class Meta:
		fields = '__all__',
		read_only_fields = '__all__',

	# lead_count = Message.objects.all().count()
	# message = MessageSerializer()
	# def get_lead_count(self, obj):
	# 	lead_count = obj.text.count
	# 	#time = #hours since created
	# 	return lead_count
	# lead_count = serializers.ReadOnlyField()
	# lead_count = serializers.Field(source='lead_count')
	# # lead_count = serializers.SerializerMethodField()
	# # # lead_status_count = serializers.SerializerMethodField()
	# class Meta:
	# 	model = Message
	# 	# fields = 'leadcount', "lead_count"
	# 	fields = "lead_count",
	# For validation
	# def get_lead_count(self, obj):
	# 	message = Message.objects.all().count()
		
	# 	return message
	# def get_lead_count(self, obj):
	# 	lead_count=Message.objects.filter(owner=obj.owner).count()
	# 	return lead_count
	# 	extra_kwargs = {
	# 			'lead_count': {'read_only': True},
	# 			#'lead_status_count': {'read_only': True},
	# 			} 
	# def get_lead_count(self, obj):
	# 	lead_count=Message.objects.filter(owner=obj.owner).count()
	# 	return lead_count
	# lead_count = serializers.IntegerField()


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