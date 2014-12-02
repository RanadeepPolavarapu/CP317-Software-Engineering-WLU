# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20141130_2044'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chuser',
            name='json_liked_recipes',
            field=models.TextField(default='[]', verbose_name='Recipes liked (favourited) by this CHUser in JSON format'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='chuser',
            name='json_recipe_rating',
            field=models.TextField(default='[]', verbose_name='Recipes rated by this CHUser in JSON format'),
            preserve_default=True,
        ),
    ]
