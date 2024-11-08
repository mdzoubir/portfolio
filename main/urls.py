from django.contrib import admin
from django.urls import path, include

from main import views

app_name = 'main'

urlpatterns = [
    path('', views.home, name='home'),  # Home page URL
    path('contact/', views.contact_view, name='contact'),
]
