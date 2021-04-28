from django.db.models.signals import post_save
from django.conf import settings
from django.db import models


LABEL_CHOICES = (
	('P', 'primary'),
	('S', 'secondary'),
	('D', 'danger')
)

ADDRESS_CHOICES = (
	('B', 'Billing'),
	('S', 'Shipping'),
)
CONDITION_CHOICES = (
	('N', 'New'),
	('U', 'Used'),
)

COLOR_CHOICES = (
	('R', 'Red'),
	('B', 'Blue'),
)

class Banner(models.Model):
    image = models.ImageField(upload_to='banners/')
    quote = models.CharField(max_length=30)
    tag1 = models.CharField(max_length=10)
    tag2 = models.CharField(max_length=10)
    tag3 = models.CharField(max_length=10)

    
class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    rating = models.IntegerField(default=2)
    image = models.ImageField(upload_to='uploads/')
    description = models.TextField()
    condition = models.CharField(choices=CONDITION_CHOICES,max_length=1,blank=True, null=True)
    color = models.CharField(choices=COLOR_CHOICES,max_length=1,blank=True, null=True)
    price = models.FloatField()
    keywords = models.CharField(choices=LABEL_CHOICES, max_length=1)
    discount_price = models.FloatField(blank=True, null=True)
    release_date = models.DateField(auto_now_add=True,null=True)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
