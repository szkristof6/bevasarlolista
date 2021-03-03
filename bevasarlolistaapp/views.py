from django.shortcuts import render, redirect
from django.http import JsonResponse
import json

from .models import Bevasarlolista


def home_view(request, *args, **kwargs):
    kontextus = {
        "a": 123,
        "b": "blablabla",
        "l": [1, 3, 5, 7, 9],
    }
    return render(request, "home.html", kontextus)


def bevasarlolista_view(request, uuid, *args, **kwargs):

    if(Bevasarlolista.protection(uuid)):
        array = {
            "uuid": uuid,
            "nev": Bevasarlolista.get_lista(uuid).nev,
            "tetelek": Bevasarlolista.get_lista(uuid).tetel
        }

        return render(request, "bevasarlolista.html", array)
    else:
        return redirect("/")


def create(request, *args, **kwargs):

    uuid = Bevasarlolista.create()
    data = {
        'response': uuid,
    }

    return JsonResponse(data)


def add(request, *args, **kwargs):
    array = json.load(request)

    if(Bevasarlolista.add_tetel(array)):
        data = {
            'response': 'Ok',
        }

        return JsonResponse(data)


def frissit(request, *args, **kwargs):
    array = json.load(request)

    if(Bevasarlolista.frissit_tetel(array)):
        data = {
            'response': 'Ok',
        }

        return JsonResponse(data)


def torles(request, *args, **kwargs):
    array = json.load(request)

    if(Bevasarlolista.torol_tetel(array)):
        data = {
            'response': 'Ok',
        }

        return JsonResponse(data)


def delete(request, *args, **kwargs):
    array = json.load(request)

    if(Bevasarlolista.torol_bevasarlolista(array)):
        data = {
            'response': 'Ok',
        }

        return JsonResponse(data)

def rename(request, *args, **kwargs):
    array = json.load(request)

    if(Bevasarlolista.atnevez_bevasarlolista(array)):
        data = {
            'response': 'Ok',
        }

        return JsonResponse(data)

def index_view(request, *args, **kwargs):
    return render(request, "index.html", {"response": Bevasarlolista.get_all() })

# Create your views here.
