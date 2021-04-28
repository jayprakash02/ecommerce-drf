from .models import Item
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('-date_added')
    serializer_class = ItemSerializer