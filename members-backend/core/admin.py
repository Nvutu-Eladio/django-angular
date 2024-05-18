from django.contrib import admin # type: ignore
from .models import Member

admin.site.register(Member)
