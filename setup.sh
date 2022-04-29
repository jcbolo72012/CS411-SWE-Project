#!/bin/bash

cd backend && (
pip freeze --local > requirements.txt
pip install -r requirements.txt
python manage.py makemigrations backend
python manage.py migrate
)

cd ../frontend && npm i --force