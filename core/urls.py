from django.urls import path,include
from rest_framework import routers
from .viewsets import ItemViewSet,BannerViewset

router = routers.DefaultRouter()
router.register(r'product', ItemViewSet)
router.register(r'banner',BannerViewset)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path('', include(router.urls)),
]
