# Generated by Django 3.1.7 on 2021-03-02 09:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bevasarlolistaapp', '0002_auto_20210302_1058'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bevasarlolista',
            options={'verbose_name': 'Bevásárlólista', 'verbose_name_plural': 'Bevásárlólisták'},
        ),
        migrations.RenameField(
            model_name='bevasarlolista',
            old_name='targy',
            new_name='tetel',
        ),
    ]
