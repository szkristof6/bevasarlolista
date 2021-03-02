from django.db import models
import uuid
from uuid import UUID
import datetime


class Bevasarlolista(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, unique=True)
    nev = models.CharField(max_length=30, default="Névtelen")
    tetel = models.JSONField(encoder=None)
    date = models.DateField()

    class Meta:
        verbose_name = 'Bevásárlólista'
        verbose_name_plural = 'Bevásárlólisták'

    def __str__(self):
        return f"{self.nev}"

    def is_uuid(id):
        try:
            UUID(id, version=4)
            return True
        except ValueError:
            return False

    def protection(id):
        try:
            UUID(id, version=4)
        except ValueError:
            return False
        response = Bevasarlolista.objects.filter(id=id)
        if response.count() > 0:
            return True

    def torol_bevasarlolista(json):
        query = Bevasarlolista.objects.filter(id=json['id'])
        if not list(query)[0]:
            return False
        else:
            query.delete()
            return True

    def frissit_tetel(json):
        query = Bevasarlolista.objects.filter(id=json['id'])
        if not list(query)[0].tetel:
            return False
        else:
            new_list = list(query)[0].tetel
            new_list[json['tetel_id']]['db'] = json['db']
            query.update(tetel=new_list)

            return True

    def torol_tetel(json):
        query = Bevasarlolista.objects.filter(id=json['id'])
        if not list(query)[0].tetel:
            return False
        else:
            new_list = list(query)[0].tetel
            del new_list[json['tetel_id']]
            query.update(tetel=new_list)

            return True

    def add_tetel(json):
        query = Bevasarlolista.objects.filter(id=json['id'])
        if not list(query)[0].tetel:
            lista = [{
                'id': 1,
                'nev': json['nev'],
                'db': json['db']
            }]
            query.update(tetel=lista)

            return True
        else:
            eddigi = list(query)[0].tetel
            eddigi.append({
                'id': eddigi[len(eddigi)-1]['id']+1,
                'nev': json['nev'],
                'db': json['db']
            })
            query.update(tetel=eddigi)

            return True

    def get_lista(id):
        response = list(Bevasarlolista.objects.filter(id=id))
        return response[0]

    def create():
        id = uuid.uuid4().hex
        Bevasarlolista(id=id, tetel=[], date=datetime.datetime.now()).save()

        return id


class Elem(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    targy = models.CharField(max_length=128)
    db = models.IntegerField()

    class Meta:
        verbose_name = 'Elem'
        verbose_name_plural = 'Elemek'

    def __str__(self):
        return f"{self.targy} {self.db}"


# Create your models here.
