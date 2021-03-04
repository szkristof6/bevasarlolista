from django.db import models
import uuid
from uuid import UUID
import datetime
from datetime import datetime


class Bevasarlolista(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, unique=True)
    nev = models.CharField(
        max_length=30, default=datetime.now().strftime("%Y.%m.%d"))
    tetel = models.JSONField(encoder=None)
    date = models.DateField()

    class Meta:
        verbose_name = 'Bevásárlólista'
        verbose_name_plural = 'Bevásárlólisták'

    def __str__(self):
        return f"{self.nev}"

    def protection(id):
        try:
            UUID(id, version=4)
        except ValueError:
            return False
        response = Bevasarlolista.objects.filter(id=id)
        if response.count() > 0:
            return True

    def atnevez_bevasarlolista(json):
        query = Bevasarlolista.objects.filter(id=json['id'])
        if not list(query)[0]:
            return 'nem talált bevasarlolista'
        else:
            if(list(query)[0].nev != json['nev']):
                try:
                    query.update(nev=json['nev'])
                    return True
                except ValueError:
                    return ValueError
            else:
                return 'azonos érték'

    def torol_bevasarlolista(json):
        query = Bevasarlolista.objects.filter(id=json['id'])
        if not list(query)[0]:
            return 'nem talált bevasarlolista'
        else:
            try:
                query.delete()
                return True
            except ValueError:
                return ValueError

    def frissit_tetel(json):
        query = Bevasarlolista.objects.filter(id=json['id'])
        if not list(query)[0].tetel:
            return 'nem talált tétel'
        else:
            new_list = list(query)[0].tetel
            if(new_list[json['tetel_id']]['db'] != int(json['db'])):
                new_list[json['tetel_id']]['db'] = int(json['db'])
                try:
                    query.update(tetel=new_list)
                    return True
                except ValueError:
                    return ValueError
            else:
                return 'azonos érték'

    def torol_tetel(json):
        query = Bevasarlolista.objects.filter(id=json['id'])
        if not list(query)[0].tetel:
            return 'nem talált tétel'
        else:
            new_list = list(query)[0].tetel
            del new_list[json['tetel_id']-1]
            try:
                query.update(tetel=new_list)
                return True
            except ValueError:
                return ValueError

    def add_tetel(json):
        query = Bevasarlolista.objects.filter(id=json['id'])
        if not list(query)[0].tetel:
            lista = [{
                'id': 1,
                'nev': json['nev'],
                'db': int(json['db'])
            }]
            query.update(tetel=lista)

            return True
        else:
            eddigi = list(query)[0].tetel
            for adat in eddigi:
                if(json['nev'] != adat['nev']):
                    eddigi.append({
                        'id': int(eddigi[len(eddigi)-1]['id']+1),
                        'nev': json['nev'],
                        'db': int(json['db'])
                    })
                    try:
                        query.update(tetel=eddigi)
                        return True
                    except ValueError:
                        return ValueError
                else:
                    return 'azonos név'

    def get_lista(id):
        response = list(Bevasarlolista.objects.filter(id=id))
        return response[0]

    def get_all():
        array = []
        response = Bevasarlolista.objects.all()
        for elem in response:
            array.append({
                "id": elem.id.hex,
                "nev": elem.nev,
                "tetel": len(elem.tetel),
                "date": elem.date
            })
        return array

    def create():
        id = uuid.uuid4().hex
        try:
            Bevasarlolista(id=id, tetel=[], date=datetime.now()).save()
            return {'response': True, 'massage': id}
        except ValueError:
            return {'response': ValueError, 'massage': ValueError}

# Create your models here.
