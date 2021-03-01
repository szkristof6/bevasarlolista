from django.db import models

class Elem(models.Model):

	id = models.AutoField(primary_key=True)
	targy = models.CharField(max_length=128)
	db = models.IntegerField()
	date = models.DateField()

	class Meta:
		verbose_name = 'Elem'
		verbose_name_plural = 'Elemek'

	def __str__(self):
		return f"{self.targy} {self.db}"

# Create your models here.
