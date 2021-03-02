from django.db import models
import uuid

class Bevasarlolista(models.Model):

	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	tetel = models.JSONField(encoder=None)
	date = models.DateField()

	class Meta:
		verbose_name = 'Bevásárlólista'
		verbose_name_plural = 'Bevásárlólisták'

	def __str__(self):
		return f"{self.tetel}"

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
