from django.shortcuts import render
from rest_framework import viewsets, permissions, pagination
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


# from rest_framework.decorators import detail_route

class MessagePageNumberPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'size'
    max_page_size = 20

    def get_paginated_response(self, data):
        # author = False
        # user = self.request.user
        # if user.is_authenticated:
        #     author = True
        context = {
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            # 'author': author,
            'noteitems': data,
        }
        return Response(context)     

class MessageViewSet(viewsets.ModelViewSet):

	queryset = Message.objects.all()
	serializer_class = MessageSerializer
	permission_classes = [permissions.IsAuthenticated] #убрать Attribute error с /api/messages/
	pagination_class    = MessagePageNumberPagination

	def get_queryset(self):
		if self.request.user.is_staff or self.request.user.is_superuser:
			return Message.objects.all().order_by('-id')
		else:
			return self.request.user.messages.all().order_by('-id')
		

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