from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField('Nome',max_length=100)
    price = models.DecimalField('Preço',max_digits=10, decimal_places=2)
    description = models.TextField('Descrição')
    amount = models.IntegerField('Quantidade')

    def __str__(self):
        return f'{self.name}'

class cliente (models.Model):
    name = models.CharField('Nome',max_length=50)
    sobrenome = models.CharField('Sobrenome',max_length=50)
    email = models.EmailField('E-mail',max_length=100)
    phone = models.CharField('Telefone',max_length=15)
    
    def __str__(self):
        return f'{self.name} {self.sobrenome}'
