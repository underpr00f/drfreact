from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
#from django.utils.translation import ugettext_lazy as _

class Item(models.Model):
	title = models.CharField(max_length=100)
	description = models.CharField(max_length=500)
	image = models.ImageField(upload_to="images")
	slug = models.SlugField(unique=True)

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
	is_corporate = models.BooleanField(blank=True, null=True, default=False)
	email = models.EmailField(blank=True, null=True)
	linkedin_profile = models.URLField(blank=True, null=True, max_length=250)
	website = models.URLField(blank=True, null=True, max_length=250)
	def __str__(self):
		return self.text


