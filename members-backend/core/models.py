from django.db import models # type: ignore

# Create your models here.

class Member(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField(max_length=200)
    address = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='members_profile')
    
    
    def __str__(self):
        return self.name + " " + self.surname
