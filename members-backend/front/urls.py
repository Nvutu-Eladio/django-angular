from django.contrib import admin # type: ignore
from django.urls import path, include # type: ignore
from rest_framework import routers # type: ignore
from core.views import MemberViewSet

router = routers.DefaultRouter()
router.register(r'members', MemberViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
