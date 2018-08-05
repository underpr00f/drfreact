from rest_framework import serializers
from .models import Item
class ItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = Item
		fields = 'id','title', 'description', 'image', 'slug'
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
