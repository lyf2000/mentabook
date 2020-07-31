# MentaBook - miss nothing

### Installation (DEV)

1. Create empty folder
1. There pass the command: `git clone https://github.com/lyf2000/mentabook.git`
1. In `/.env` put your data and Google account credits (in root proj)
    ```
    DEBUG = True
    CELERY_BROKER_URL = redis://localhost:6379
    CELERY_RESULT_BACKEND = redis://localhost:6379
    ADMIN_GOOGLE_EMAIL = <google mail>
    ADMIN_GOOGLE_PASSWORD = <password>
    FRONTEND_URL = http://localhost:8080
    DB_NAME = <db name>
    DB_USER = <user name db>
    DB_PASSWORD = <user password db>
    ```
1. In `/frontend/.env`:
    ```
    VUE_APP_BACKEND_HOST=http://localhost:8000
    ```
1. Run the following commands:
    ```
    # at the root
   pipenv init
   pipenv shell
   redis-server
   celery -A backend.core worker -l info --pool=solo
   python manage.py runserver

   # at the ./frontend
   npm install
   npm run serve
    ```
1. That's it! You just need to open [Link](http://localhost:8080/) page 

### Installation (DOCKER)

1. Run in root `ocker-compose up --build`
1. Open [Link](http://localhost:1234/)
