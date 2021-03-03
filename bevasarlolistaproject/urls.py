"""bevasarlolistaproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path

from bevasarlolistaapp.views import home_view, index_view, bevasarlolista_view, add, frissit, torles, delete, create, rename

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^bevasarlolista/(?P<uuid>\w{0,50})/$', bevasarlolista_view),
    path('create/', create),
    path('add/', add),
    path('frissit/', frissit),
    path('torles/', torles),
    path('delete/', delete),
    path('rename/', rename),
    path('', index_view)
]
