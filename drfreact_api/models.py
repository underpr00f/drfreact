from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
#from django.utils.translation import ugettext_lazy as _

class Item(models.Model):
	title = models.CharField(max_length=100)
	description = models.CharField(max_length=500)
	image = models.ImageField(upload_to="images")
	slug = models.SlugField(unique=True)

class Payments(models.Model):
	owner = models.ForeignKey(User, related_name="payments_user", on_delete=models.CASCADE, 
		null=True)
	# message = models.ForeignKey(Message, related_name="payments", on_delete=models.CASCADE, 
	# 	null=True)
	#lead_count = models.IntegerField(default=0)

class Message(models.Model):
	# slug = models.SlugField(Item)
	STATUS_CHOICES = (
		("Candidate", "Candidate"),
		("Processed", "Processed"),
		("Converted", "Converted"),
		("Rejected", "Rejected"),
	)

	text = models.CharField(max_length=500)
	phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
	phone = models.CharField(validators=[phone_regex], max_length=17, blank=True) # validators should be a list 
	created_at = models.DateTimeField(auto_now_add=True)
	owner = models.ForeignKey(User, related_name="messages", on_delete=models.CASCADE, 
		null=True)
	status = models.CharField(max_length=10, blank=True, null=True, choices=STATUS_CHOICES, default="Candidate")
	is_payed = models.BooleanField(blank=True, null=True, default=False)
	is_corporate = models.BooleanField(blank=True, null=True, default=False)
	email = models.EmailField(blank=True, null=True)
	linkedin_profile = models.URLField(blank=True, null=True, max_length=250)
	website = models.URLField(blank=True, null=True, max_length=250)

	def __str__(self):
		return self.text

# from django.db.models.signals import post_save
# def create_payments(sender, instance, created, **kwargs):
# 	"""Creates a UserProfile Object Whenever a User Object is Created"""
# 	if created:
# 		lead_count=Message.objects.filter(owner=instance.owner).count()
# 		Payments.objects.create(owner=instance.owner, lead_count=lead_count)

# post_save.connect(create_payments, sender=Message)

# from django.db.models.signals import post_save
# from django.dispatch import receiver
# # method for updating
# @receiver(post_save, sender=TransactionDetail, dispatch_uid="update_stock_count")
# def update_stock(sender, instance, **kwargs):
#      instance.product.stock -= instance.amount
#      instance.product.save()