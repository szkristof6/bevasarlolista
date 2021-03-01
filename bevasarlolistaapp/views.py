from django.shortcuts import render

def home_view(request, *args, **kwargs):
    kontextus = {
    "a": 123,
    "b": "blablabla",
    "l": [1,3,5,7,9],
    }
    return render(request, "home.html", kontextus) 

def bevasarlolista_view(request, *args, **kwargs):
	return render(request, "bevasarlolista.html") 

# Create your views here.
