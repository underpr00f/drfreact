from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer

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
