from django.shortcuts import render, redirect
from django.http import JsonResponse
import json

from .models import Bevasarlolista


def hitelesit(input):
    return str(input).replace("&", ' ').replace("<", ' ').replace(">", ' ').replace('"', ' ').strip()


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

    response = Bevasarlolista.create()
    if(response['response'] == True):
        data = {
            'response': 'OK',
            'massage': response['massage'],
        }
    else:
        data = {
            'response': response['response'],
            'massage': response['massage'],
        }

    return JsonResponse(data)


def add(request, *args, **kwargs):
    array = json.load(request)

    id = hitelesit(array['id'])
    nev = hitelesit(array['nev'])
    db = hitelesit(array['db'])

    if(id and nev and db):
        response = Bevasarlolista.add_tetel(array)
        if(response == True):
            data = {
                'response': 'OK',
                'massage': 'Sikeres művelet! Betöltés 1mp múlva.'
            }
        elif response == 'azonos név':
            data = {
                'response': response,
                'massage': 'Már létezik ilyen tárgy a bevásárlólistában!'
            }
        else:
            data = {
                'response': response,
                'massage': response
            }
    else:
        data = {
            'response': 'Adat hiba',
            'massage': 'Az adatok nincsenek megadva!'
        }
    return JsonResponse(data)


def frissit(request, *args, **kwargs):
    array = json.load(request)

    id = hitelesit(array['id'])
    tetel_id = hitelesit(array['tetel_id'])
    db = hitelesit(array['db'])

    if(id and tetel_id and db):
        response = Bevasarlolista.frissit_tetel(array)
        print(response)
        if(response == True):
            data = {
                'response': 'OK',
                'massage': 'Sikeres művelet!'
            }
        elif response == 'nem talált tétel':
            data = {
                'response': response,
                'massage': 'Nem található a megadott tétel!'
            }
        elif response == 'azonos érték':
            data = {
                'response': response,
                'massage': 'Adj meg egy eltérő darabszámot!'
            }
        else:
            data = {
                'response': response,
                'massage': response
            }

    return JsonResponse(data)


def torles(request, *args, **kwargs):
    array = json.load(request)

    id = hitelesit(array['id'])
    tetel_id = hitelesit(array['tetel_id'])

    if(id and tetel_id):
        response = Bevasarlolista.torol_tetel(array)
        if(response == True):
            data = {
                'response': 'OK',
                'massage': 'Sikeres művelet!'
            }
        elif response == 'nem talált tétel':
            data = {
                'response': response,
                'massage': 'Nem található a megadott tétel!'
            }

    return JsonResponse(data)


def delete(request, *args, **kwargs):
    array = json.load(request)

    id = hitelesit(array['id'])

    if(id):
        response = Bevasarlolista.torol_bevasarlolista(array)
        if(response == True):
            data = {
                'response': 'OK',
                'massage': 'Sikeres művelet! Visszatérés a főoldalra 2mp múlva.'
            }
        elif response == 'nem talált bevasarlolista':
            data = {
                'response': response,
                'massage': 'A kiválasztott bevásárlólista nem található!'
            }

    return JsonResponse(data)


def rename(request, *args, **kwargs):
    array = json.load(request)

    id = hitelesit(array['id'])
    nev = hitelesit(array['nev'])

    if(id and nev):
        response = Bevasarlolista.atnevez_bevasarlolista(array)
        if(response == True):
            data = {
                'response': 'OK',
                'massage': 'Sikeres művelet!',
            }
        elif response == 'nem talált bevasarlolista':
            data = {
                'response': response,
                'massage': 'A kiválasztott bevásárlólista nem található!'
            }
        elif response == 'azonos érték':
            data = {
                'response': response,
                'massage': 'Adj meg egy eltérő nevet!'
            }

    return JsonResponse(data)


def index_view(request, *args, **kwargs):
    return render(request, "index.html", {"response": reversed(Bevasarlolista.get_all())})

# Create your views here.
