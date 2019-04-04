
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include, re_path

from django.views.generic import TemplateView
from drfreact_api.views import ItemViewSet, MessageViewSet, PaymentsViewSet
from posts.views import PostsViewSet
from user_profile.views import UserViewSet

#from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register(r'item', ItemViewSet, base_name='item')
router.register(r'investors', MessageViewSet, base_name='investors')
router.register(r'posts', PostsViewSet, base_name='posts')
router.register(r'user', UserViewSet, base_name='user')
router.register(r'payments', PaymentsViewSet, base_name='payments')
#router.register(r'profile', UserViewSet, base_name='profile')

urlpatterns = [	
	url(r'^api/', include(router.urls)),
	# url(r'^messages/', include(endpoints)),
    url(r'^admin/', admin.site.urls),
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    # url(r'', TemplateView.as_view(template_name="index.html")),
    #url(r'user/menu/$', message_list),
    url(r'investors', TemplateView.as_view(template_name="index.html", )),
    url(r'payments', TemplateView.as_view(template_name="index.html", )),
    path('api/posts/', include('posts.urls')),
    path(r'walking', TemplateView.as_view(template_name='index.html')),
    re_path(r'^react/posts/', TemplateView.as_view(template_name='index.html')),
    # This is used for user reset password
    url(r'^', include('django.contrib.auth.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^account/', include('allauth.urls')),
    
    #path(r'api-token-auth/', views.obtain_auth_token, name='api-token-auth')
    
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

#fix problem with images and 404 error from DRF
urlpatterns += [
	re_path(r'.*', TemplateView.as_view(template_name='index.html')),
]