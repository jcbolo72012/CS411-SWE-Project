#!/bin/bash

. keys.conf
# echo $SPOONACULAR_API_KEY
export SPOONACULAR_API_KEY=$SPOONACULAR_API_KEY
export TODOIST_CLIENT_ID=$TODOIST_CLIENT_ID
export TODOIST_CLIENT_SECRET=$TODOIST_CLIENT_SECRET

((cd backend && python3 manage.py runserver) &&
(cd frontend && npm start))