from rest_framework import viewsets
from rest_framework import permissions,status
from rest_framework.response import Response

from .models import Item,Banner,Customer,OrderItem,Order
from .serializers import ItemSerializer,BannerSerializer,OrderSerializer,OrderItemSerializer,CustomerSerializer


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