from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework import viewsets, permissions, authentication,generics

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    #authentication_classes = (authentication.TokenAuthentication, authentication.SessionAuthentication)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": _("Your profile update successfully.")})

    


