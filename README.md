# Django 1.0

Projeto web desenvolvido com **Django 6.0.6** como parte do curso de aprendizado do framework. A aplicação inclui cadastro de produtos e clientes, painel administrativo personalizado e páginas de visualização com templates HTML.

## 🛠️ Tecnologias

- **Python 3**
- **Django 6.0.6**
- **SQLite3** (banco de dados padrão)
- **HTML5** (templates)

## 📁 Estrutura do Projeto

```
django/
├── manage.py
├── db.sqlite3
├── djnago1/                  # Configurações do projeto
│   ├── settings.py
│   ├── urls.py               # Rotas principais
│   ├── wsgi.py
│   └── asgi.py
├── core/                     # Aplicação principal
│   ├── models.py             # Models: Product e Cliente
│   ├── views.py              # Views: index e contact
│   ├── urls.py               # Rotas da aplicação
│   ├── admin.py              # Configuração do painel admin
│   └── templates/
│       ├── index.html        # Página inicial
│       └── contact.html      # Página de contato
└── README.md
```

## 📦 Models

### Product
| Campo         | Tipo            | Descrição                  |
|---------------|-----------------|----------------------------|
| `name`        | CharField(100)  | Nome do produto            |
| `price`       | DecimalField    | Preço (até 10 dígitos)     |
| `description` | TextField       | Descrição do produto       |
| `amount`      | IntegerField    | Quantidade em estoque      |

### Cliente
| Campo       | Tipo            | Descrição                |
|-------------|-----------------|--------------------------|
| `name`      | CharField(50)   | Nome do cliente          |
| `sobrenome` | CharField(50)   | Sobrenome do cliente     |
| `email`     | EmailField(100) | E-mail de contato        |
| `phone`     | CharField(15)   | Telefone de contato      |

## 🌐 Rotas

| Rota           | View      | Descrição                  |
|----------------|-----------|----------------------------|
| `/`            | `index`   | Página inicial             |
| `/contact`     | `contact` | Página de contato          |
| `/admMaster/`  | Admin     | Painel administrativo      |

## ⚙️ Painel Administrativo

Os models **Product** e **Cliente** estão registrados no Django Admin com as seguintes configurações:

- **Product**: exibição por nome, preço e quantidade; filtro e busca por nome e preço.
- **Cliente**: exibição por nome, sobrenome, e-mail e telefone; filtro e busca por nome e sobrenome.

Acesse em: `http://localhost:8000/admMaster/`

## 🚀 Como Executar

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd django
   ```

2. **Crie e ative o ambiente virtual:**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate       # Windows
   ```

3. **Instale as dependências:**
   ```bash
   pip install django
   ```

4. **Execute as migrações:**
   ```bash
   python manage.py migrate
   ```

5. **Crie um superusuário (para acessar o admin):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Inicie o servidor:**
   ```bash
   python manage.py runserver
   ```

7. **Acesse no navegador:**
   - Página inicial: `http://localhost:8000/`
   - Contato: `http://localhost:8000/contact`
   - Admin: `http://localhost:8000/admMaster/`

## 🌍 Configurações Regionais

- **Idioma:** Português (Brasil) — `pt-br`
- **Fuso horário:** `America/Sao_Paulo`
