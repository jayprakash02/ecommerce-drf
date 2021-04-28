from django.urls import path,include
from rest_framework import routers
from .viewsets import ItemViewSet

router = routers.DefaultRouter()
router.register(r'product', ItemViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
urlpatterns = [
    path('', include(router.urls)),
]
