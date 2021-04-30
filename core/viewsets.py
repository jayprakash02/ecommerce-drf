from rest_framework import viewsets
from rest_framework import permissions,status
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Item,Banner,Customer,OrderItem,Order
from .serializers import ItemSerializer,BannerSerializer,OrderSerializer,OrderItemSerializer,CustomerSerializer

import json

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('-date_added')
    serializer_class = ItemSerializer

class BannerViewset(viewsets.ModelViewSet):
    queryset = Banner.objects.all()[:3]
    serializer_class = BannerSerializer

class CustomerViewset(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def retrieve(self,request,key=None):
        customer_instance = Customer.objects.filter(key=key)
        if customer_instance.exists():
            return Response('User Exist',status=status.HTTP_200_OK)
        else:
            Customer.objects.create(key=key,visit=1)
            return Response('User Created',status=status.HTTP_201_CREATED)
            
        return Response('Error',status=status.HTTP_400_BAD_REQUEST)

class OrderItemViewset(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    lookup_field = 'key'

    def create(self,request):
        if self.request.data.__contains__('key') and self.request.data.__contains__('item_id'):
            customer_instance, created=Customer.objects.get_or_create(key=request.data['key'])
            item_instance = Item.objects.get(id=request.data['item_id'])
            OrderItem.objects.create(customer=customer_instance,item=item_instance,quantity=request.data['quantity'])
            return Response('', status=status.HTTP_201_CREATED)
        return Response('',status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request):
        key = self.request.query_params.get('key')
        if not key==None:
            customer_instance = Customer.objects.filter(key=str(key))
            if customer_instance.exists():
                customer_instance = Customer.objects.get(key=str(key))
                order_item = OrderItem.objects.filter(customer=customer_instance)
                item_list = []
                for obj in order_item:
                    item = {'name': obj.item.name, 'image': obj.item.image.url, 'price':obj.item.price, 'quantity':obj.quantity }
                    item_list.append(item.copy())
                return JsonResponse(item_list,safe=False,status=status.HTTP_202_ACCEPTED)
        return Response('{0}'.format(key),status=status.HTTP_406_NOT_ACCEPTABLE)