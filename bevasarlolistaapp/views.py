from django.shortcuts import render
from django.http import JsonResponse
import json


def home_view(request, *args, **kwargs):
    kontextus = {
        "a": 123,
        "b": "blablabla",
        "l": [1, 3, 5, 7, 9],
    }
    return render(request, "home.html", kontextus)


def bevasarlolista_view(request, uuid, *args, **kwargs):
    array = {
        "uuid": uuid
    }

    if request.method == "POST":
        print(request)

    return render(request, "bevasarlolista.html", array)


def add(request, *args, **kwargs):
    array = json.load(request)

    print(f'{array}')

    data = {
        'response': 'Ok',
    }

    return JsonResponse(data)


def index_view(request, *args, **kwargs):
    return render(request, "index.html")

# Create your views here.
