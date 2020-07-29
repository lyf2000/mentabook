# MentaBook - miss nothing

### Installation

1. Create empty folder
1. There pass the command: `git clone https://github.com/lyf2000/mentabook.git`
1. In `.env` put your Google account credits (in root proj)
    ```
    DEBUG = True
    CELERY_BROKER_URL = redis://localhost:6379
    CELERY_RESULT_BACKEND = redis://localhost:6379
    ADMIN_GOOGLE_EMAIL = <google mail>
    ADMIN_GOOGLE_PASSWORD = <password>
    FRONTEND_URL = http://localhost:8080
    ```
1. Run the following commands:
    ```
   pipenv init
   pipenv shell
   python manage.py makemigrations
   python manage.py migrate
   
    ```
1. There is! You just need to open `http://localhost:8000/admin/` page and create new books

### TUT

First of all, you need to specify all admin-emails that will be notified about new order, just open 'clickbook/settings.py' and add new emails to the list:
```
ADMINS = [
    ('Name', 'lyf2000@mail.ru'),
    ...
]
```

List of APIs:

- Registration `/signup/` POST body:
    ```
    {
       "username": "<new username>"  
       "password": "<your password>"  
    }
    ```
- Authorization. Here You're getting `access_token` which is gotta to be put in `Authorization` header `/login/` POST body:
    ```
    {
       "username": "<your username>"  
       "password": "<your password>"  
    }
    ```
- Books `/books/` GET you will get:
    ```
    [
      ...
      {
        "id": <int>,
        "name": <string>,
        "cost": <int>,
        "author": {
          "id": <int>,
          "fio": <string>
        }
      }
      ...
    ]
    ```
- Authors `/authors/` GET you will get:
    ```
    [
      ...
      {
        "id": <int>,
        "fio": <string>
        "books_count": <int>,
        "books": {
          "id": <int>,
          "name": <string>,
          "cost": <int>
        }
      }
      ...
    ]
    ```
- Order book. You need to have header `Authorization: Bearer <token>`. '/books/order/' POST  body:
    ```
    "book": <book id>,
    "call": <phone number int>,
    "comment": <string> # OPTIONAL
    ```