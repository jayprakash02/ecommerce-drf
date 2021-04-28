from .models import Item,Banner
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ItemSerializer,BannerSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('-date_added')
    serializer_class = ItemSerializer

class BannerViewset(viewsets.ModelViewSet):
    queryset = Banner.objects.all()[:3]
    serializer_class = BannerSerializer