from rest_framework import serializers
from .models import Item,Banner

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class BannerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'