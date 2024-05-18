from rest_framework import viewsets # type: ignore
from .models import Member
from .serializers import MemberSerializer, MemberSimpleSerializer
from rest_framework.response import Response # type: ignore



class MemberViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    
    def list(self, request, *args, **kwargs):
        queryset = Member.objects.all()
        serializer = MemberSimpleSerializer(queryset, many=True)
        return Response(serializer.data)