from django.contrib import admin

# Register your models here.
from .models import UserProfile

class UserModelAdmin(admin.ModelAdmin):
    #list_display = ["first_name", ]
    # list_display_links = ["updated"]
    # list_editable = ["title"]
    # list_filter = ["updated", "timestamp"]

    # search_fields = ["title", "content"]
    class Meta:
        model = UserProfile


admin.site.register(UserProfile, UserModelAdmin)