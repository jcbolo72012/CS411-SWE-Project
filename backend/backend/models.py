from asyncio.windows_events import NULL
from unittest.util import _MAX_LENGTH
from django.db import models
from django import forms

class Auth(models.Model):
    state = models.CharField(max_length=10)

class User(models.Model):
    token = models.CharField(max_length=10)

class Review(models.Model):
    username = models.ForeignKey(User, on_delete=models.PROTECT)
    item = models.CharField(max_length=20, default=NULL)
    review = models.TextField()
    def __str__(self):
        return self.review

class ReviewForm(forms.Form):
    review = forms.TextInput()