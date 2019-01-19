from django.contrib import admin

# Register your models here.
from .models import Message, Payments

class MessageModelAdmin(admin.ModelAdmin):
    # list_display = ["title", "updated", "timestamp"]
    # list_display_links = ["updated"]
    # list_editable = ["title"]
    # list_filter = ["updated", "timestamp"]

    # search_fields = ["title", "content"]
    class Meta:
        model = Message

class PaymentsModelAdmin(admin.ModelAdmin):
    # list_display = ["title", "updated", "timestamp"]
    # list_display_links = ["updated"]
    # list_editable = ["title"]
    # list_filter = ["updated", "timestamp"]

    # search_fields = ["title", "content"]
    class Meta:
        model = Payments



admin.site.register(Message, MessageModelAdmin)
admin.site.register(Payments, PaymentsModelAdmin)