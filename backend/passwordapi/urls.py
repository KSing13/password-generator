from django.urls import path
from .views import password_generator

urlpatterns = [
    path('generate/', password_generator),
]