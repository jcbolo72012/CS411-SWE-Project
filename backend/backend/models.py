from django.db import models

class Auth(models.Model):
    state = models.CharField(max_length=10)

class User(models.Model):
    token = models.CharField(max_length=10)

class Review(models.Model):
    username = models.ForeignKey(User, on_delete=models.PROTECT)
    review = models.TextField()