from django.shortcuts import render

# Create your views here.
def index(request):
    context = {
        'curso':'Curso de Django 1.0',
        'aluno':'Diego Silva'
    }
    return render(request,'index.html',context)

def contact(request):
    return render(request,'contact.html')