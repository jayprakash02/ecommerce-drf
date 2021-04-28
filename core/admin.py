from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Item

class ItemResource(resources.ModelResource):

    class Meta:
        model = Item

class ItemAdmin(ImportExportModelAdmin):
    resource_class = ItemResource

admin.site.register(Item,ItemAdmin)