#!/bin/bash

. keys.conf
# echo $SPOONACULAR_API_KEY
export SPOONACULAR_API_KEY=$SPOONACULAR_API_KEY
(cd backend && python3 manage.py runserver) &
(cd frontend && npm start)