from rest_framework import serializers
from .models import Item, Message, Payments
from user_profile.serializers import UserSerializer
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()

class ItemSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Item
		fields = 'id','title', 'description', 'image', 'slug', 
		read_only_fields = ['id']

	def update(self, instance, validated_data):
		instance.title = validated_data.get('title', instance.title)
		instance.description = validated_data.get('description', instance.description)
		instance.image = validated_data.get('image', instance.image)
		instance.slug = validated_data.get('slug', instance.slug)
		instance.save()

		return instance

class MessageSerializer(serializers.ModelSerializer):
	status = serializers.ChoiceField(choices=Message.STATUS_CHOICES)
	is_corporate = serializers.BooleanField(default=False)
	is_payed = serializers.BooleanField(default=False)
	email = serializers.EmailField()
	linkedin_profile = serializers.URLField()
	last_call = serializers.DateTimeField(default=None)
	# get owner's username
	owner_username = serializers.SerializerMethodField('_owner_username')	

	class Meta:
		model = Message
		fields = ('id', 'text', 'created_at', 'owner', 'phone', 
			'status', 'is_corporate', 'email', 'linkedin_profile', 
			'website', 'is_payed','last_call','owner_username',
			'correspondence','documents')
		extra_kwargs = {'phone': {'required': True}, 
						'text': {'required': True},
						'is_corporate': {'required': True},
						'is_payed': {'required': False},
						'status': {'required': True},
						'email': {'required': True},
						'linkedin_profile': {'required': True},
						'website': {'required': False},
						'last_call': {'required': False},
						'owner_username': {'read_only': True},
						'correspondence': {'required': False},
						'documents': {'required': False},
						}

	# For get username from owner
	def _owner_username(self, obj):
		if obj.owner:
			return obj.owner.username
	# For validation
	def create(self, validated_data):
		message = Message.objects.create(**validated_data)
		return message
	def update(self, instance, validated_data):
		check_staff=self.context['request'].user.is_staff or self.context['request'].user.is_superuser 
		instance.email = validated_data.get('email', instance.email)
		instance.text = validated_data.get('text', instance.text)
		instance.phone = validated_data.get('phone', instance.phone)
		instance.linkedin_profile = validated_data.get('linkedin_profile', instance.linkedin_profile)
		instance.status = validated_data.get('status', instance.status)
		instance.is_corporate = validated_data.get('is_corporate', instance.is_corporate)
		instance.website = validated_data.get('website', instance.website)
		instance.correspondence = validated_data.get('correspondence', instance.correspondence)
		instance.documents = validated_data.get('documents', instance.documents)		
		# For not required field last_call (in detailed view and input form)
		
		instance.last_call = validated_data.get('last_call', instance.last_call)
			
	
		#only staff users can edit is_payed to True
		if check_staff:
			if instance.status != "Candidate":
				instance.is_payed = validated_data.get('is_payed', instance.is_payed)
			else:
				instance.is_payed = False
				# raise ValidationError('Cannot update Candidate')

		instance.save()
		return instance

class PaymentsSerializer(serializers.Serializer):
	
	class Meta:
		fields = '__all__',
		read_only_fields = '__all__',
