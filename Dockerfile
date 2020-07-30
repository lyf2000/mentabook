FROM node:10-alpine as frontend
WORKDIR /app
COPY frontend .
ENV VUE_APP_BACKEND_HOST http://localhost:1234
RUN npm install
RUN npm run build

FROM python:3.8
WORKDIR /app

ADD ./backend ./backend
COPY --from=frontend /app/dist /vue
COPY manage.py .
COPY Pipfile Pipfile.lock ./



ENV DEBUG True
ENV CELERY_BROKER_URL redis://redis:6379
ENV CELERY_RESULT_BACKEND redis://redis:6379
ENV ADMIN_GOOGLE_EMAIL nda030600@gmail.com
ENV ADMIN_GOOGLE_PASSWORD LFVBH0110
ENV VUE_APP_BACKEND_HOST http://localhost:1234
ENV FRONTEND_URL http://localhost:8080
ENV DB_NAME postgres
ENV DB_USER postgres
ENV DB_PASSWORD postgres
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential

# install dependencies
RUN pip install --upgrade pip

RUN pip install pipenv
RUN pipenv install --system 
RUN python manage.py migrate

CMD python manage.py runserver  0.0.0.0:8000
