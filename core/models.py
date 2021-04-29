from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
import uuid

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

class User(models.Model):
    key = models.UUIDField(default = uuid.uuid4,editable=False)
    visit = models.IntegerField(default=0)

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

class Customer(models.Model):
    key = models.UUIDField(default=uuid.uuid4,editable=False)
    visit = models.IntegerField(default=0)

class OrderItem(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
	ordered = models.BooleanField(default=False)
	item = models.ForeignKey(Item, on_delete=models.CASCADE)
	quantity = models.IntegerField(default=1)


class Order(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
	items = models.ManyToManyField(OrderItem)
	ordered_date = models.DateTimeField()
	ordered = models.BooleanField(default=False)
	payment = models.BooleanField(default=False)
	being_delivered = models.BooleanField(default=False)
	received = models.BooleanField(default=False)
