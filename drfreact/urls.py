from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

from django.views.generic import TemplateView
from drfreact_api.views import ItemViewSet

router = routers.DefaultRouter()
router.register(r'item', ItemViewSet, base_name='item')

urlpatterns = [
	url(r'api/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^', TemplateView.as_view(template_name="index.html")),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
