from django.shortcuts import render, get_object_or_404
from .models import Product

# Create your views here.
def index(request):
    products = Product.objects.all()
    context = {
        'curso':'Curso de Django 1.0',
        'aluno':'Diego Silva',
        'products': products,
    }
    return render(request,'index.html',context)

def contact(request):
    return render(request,'contact.html')

def product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'product.html', {'product': product})