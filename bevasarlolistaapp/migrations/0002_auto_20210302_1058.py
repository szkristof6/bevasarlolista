# Generated by Django 3.1.7 on 2021-03-02 09:58

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('bevasarlolistaapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bevasarlolista',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('targy', models.JSONField()),
                ('date', models.DateField()),
            ],
            options={
                'verbose_name': 'Elem',
                'verbose_name_plural': 'Elemek',
            },
        ),
        migrations.RemoveField(
            model_name='elem',
            name='date',
        ),
        migrations.AlterField(
            model_name='elem',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]