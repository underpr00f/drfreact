from django.shortcuts import render
from rest_framework import viewsets, permissions, pagination
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Item, Message, Payments
from .serializers import ItemSerializer, MessageSerializer, PaymentsSerializer
from rest_framework import filters
from rest_framework.decorators import detail_route, list_route

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
            #'total_items': Message.objects.count(),
            #'author': author,
            'noteitems': data,
        }
        return Response(context)     

class MessageViewSet(viewsets.ModelViewSet):

	queryset = Message.objects.all()
	serializer_class = MessageSerializer
	permission_classes = [permissions.IsAuthenticated] #убрать Attribute error с /api/messages/
	pagination_class    = MessagePageNumberPagination
	filter_backends = (filters.SearchFilter, filters.OrderingFilter,)
	search_fields = ('text',)
	ordering_fields = ('text', 'status')

	def get_queryset(self):
		if self.request.user.is_staff or self.request.user.is_superuser:
			return Message.objects.all().order_by('-id')
		else:
			return self.request.user.messages.all().order_by('-id')
		

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)

from django.contrib.auth import get_user_model 
User = get_user_model()
import math

class PaymentsViewSet(viewsets.ModelViewSet):	
	serializer_class = PaymentsSerializer
	permission_classes = [permissions.IsAuthenticated]
	users = User.objects.all()

	def get_queryset(self):
		if self.request.user.is_staff or self.request.user.is_superuser:
			return Message.objects.values('owner', 'status', 'is_payed')
		else:
			return Message.objects.filter(owner=self.request.user).values('owner', 'status', 'is_payed')
	
	def list(self, request):

		queryset = self.get_queryset()
		output = []

		#initialize price by objects, {"investors": price-per-each}
		prices = {
			10: 50,
			20: 100,
			30: 250,
			40: 500,
			50: 1000,
		};

		if self.request.user.is_staff or self.request.user.is_superuser:	
			for user in self.users:
				total = queryset.filter(owner=user).count()
				if total:
					output_data = {};	
					price = 0;
					price_payed = 0;

					#get count payed investors
					count_payed = queryset.filter(owner=user, is_payed=True).count();
					# get true_investors (without candidate status)
					candidate_count = queryset.filter(owner=user, status='Candidate').count()					
					true_investors = total - candidate_count
					
					# Calculating price
					for key, value in prices.items():
						# Calculating price for investors without Candidate status						
						if true_investors >=10: 
							if true_investors >= key:
								price += 10*value
							else:
								if (math.ceil(true_investors/10) == key/10):
									price += (true_investors+10-key)*value
						# Get payed price 
						if count_payed and true_investors >=10: 
							if count_payed >= key:
								price_payed += 10*value
							else:
								if (math.ceil(count_payed/10) == key/10):
									price_payed += (count_payed+10-key)*value
					# output price without payed prices
					output_data['price'] = price-price_payed
					# output other data
					output_data['owner'] = user.username
					output_data['total'] = total		
					output_data['processed'] = queryset.filter(owner=user, status='Processed').count()
					output_data['converted'] = queryset.filter(owner=user, status='Converted').count()
					output_data['rejected'] = queryset.filter(owner=user, status='Rejected').count()					
					
					output.append(output_data)
		else:
			total = queryset.all().count()
			if total:
				output_data = {};
				price = 0;
				price_payed = 0;

				#get count payed investors
				count_payed = queryset.filter(is_payed=True).count();
				# get true_investors (without candidate status)
				candidate_count = queryset.filter(status='Candidate').count()					
				true_investors = total - candidate_count
				
				# Calculating price
				for key, value in prices.items():
					# Calculating price for investors without Candidate status						
					if true_investors >=10: 
						if true_investors >= key:
							price += 10*value
						else:
							if (math.ceil(true_investors/10) == key/10):
								price += (true_investors+10-key)*value
					# Get payed price 
					if count_payed and true_investors >=10: 
						if count_payed >= key:
							price_payed += 10*value
						else:
							if (math.ceil(count_payed/10) == key/10):
								price_payed += (count_payed+10-key)*value
				
				# output price without payed prices
				output_data['price'] = price-price_payed			
				output_data['owner'] = request.user.username
				output_data['total'] = total		
				output_data['processed'] = queryset.filter(status='Processed').count()
				output_data['converted'] = queryset.filter(status='Converted').count()
				output_data['rejected'] = queryset.filter(status='Rejected').count()
				output.append(output_data)			
		return Response(output)
