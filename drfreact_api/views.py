from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Item, Message
from .serializers import ItemSerializer, MessageSerializer



class ItemViewSet(viewsets.ModelViewSet):
	queryset = Item.objects.all()
	serializer_class = ItemSerializer
	
	def get_object(self):
		if self.action == 'create':
			queryset = self.filter_queryset(self.get_queryset())
			filter_kwargs = {self.lookup_field: self.request.data.get('id')}
			obj = get_object(queryset, **filter_kwargs)
			self.check_object_permissions(self.request, obj)
			return obj
		else:
			return super(ItemViewSet, self).get_object()

	def create(self, request, *args, **kwargs):
		if request.data.get('id'):
			return super(ItemViewSet, self).update(request, *args, **kwargs)
		else:
			return super(ItemViewSet, self).create(request, *args, **kwargs)


from rest_framework.decorators import detail_route

# class UserDetailsView(RetrieveUpdateAPIView):

#     serializer_class = UserDetailsSerializer
#     permission_classes = (IsAuthenticated,)

#     def get_object(self):
#         return self.request.user

#     def get_queryset(self):
#         return get_user_model().objects.none()

# class MessageView(generics.ListCreateAPIView):
#     queryset = Message.objects.all()
#     serializer_class = MessageSerializer


#     def post(self, request, *args, **kwargs):

#         post_data = {
#             'text': request.data.get('fullName'),
#             'created_at': request.data.get('created_at'),
#             'owner': request.data.get('owner'),

#         }
#         serializer = MessageSerializer(data=post_data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status.HTTP_201_CREATED)
#         return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)        

class MessageViewSet(viewsets.ModelViewSet):

	queryset = Message.objects.all()
	serializer_class = MessageSerializer
	permission_classes = [permissions.IsAuthenticated] #убрать Attribute error с /api/messages/

	def get_queryset(self):
		if self.request.user.is_staff or self.request.user.is_superuser:
			return Message.objects.all()
		else:
			return self.request.user.messages.all()
		

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)
	# @detail_route(methods=['post','get'])
	# def comment(self, request, **kwargs):

	# 	# user = self.get_object()

	# 	self.queryset = Message.objects.all()
	# 	# self.serializer_class = CommentFlat

	# 	if request.method == 'POST':

	# 		# request.data is from the POST object. We want to take these
	# 		# values and supplement it with the user.id that's defined
	# 		# in our URL parameter
	# 		data = {
	# 			'text': request.data['fullName'],
	# 		}

	# 		serializer = MessageSerializer(data=data)

	# 		if serializer.is_valid():
	# 			serializer.save()
	# 			return Response(serializer.data, status=status.HTTP_201_CREATED)
	# 		else:
	# 			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	# 	# Return GET by default
	# 	else:

	# 		serializer = MessageSerializer(instance=self.queryset, many=True)

	# 		return Response(serializer.data)


# def get(self, request):
# 	serializer = MessageSerializer(data=request.data)
# 	return Response(serializer.data)

# def post(self, request):

# 	serializer = MessageSerializer(data=request.data)
# 	if serializer.is_valid():
# 		serializer.save()
# 		return Response(serializer.data, status=status.HTTP_201_CREATED)
# 	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def message_add(request):
#     """
#     Saves a new user on the database
#     """

#     if request.method == 'POST':

#         serializer = messageSerializer(data=request.DATA)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)