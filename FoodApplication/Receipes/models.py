from django.db import models

# Create your models here.

types=(
    ("veg","Veg"),
    ("nonveg","NonVeg"),
)
class Receipe(models.Model):
    name=models.CharField(max_length=150)
    des=models.TextField(max_length=500)
    type=models.CharField(max_length=150 ,choices=types ,default='Veg')
    datee=models.DateField()
    imgg=models.CharField(max_length=500)