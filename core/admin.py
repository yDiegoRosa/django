from django.contrib import admin
from.models import Product,cliente

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'amount')
    list_filter = ('name', 'price')
    search_fields = ('name', 'price')
    ordering = ('name', 'price')
class clienteAdmin(admin.ModelAdmin):
    list_display = ('name', 'sobrenome', 'email', 'phone')
    list_filter = ('name', 'sobrenome')
    search_fields = ('name', 'sobrenome')
    ordering = ('name', 'sobrenome')
# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(cliente, clienteAdmin)