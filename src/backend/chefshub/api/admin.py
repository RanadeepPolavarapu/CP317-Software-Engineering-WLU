from django.contrib import admin

from api.models import *

# Register your models here.

class CHUserAdmin(admin.ModelAdmin):
    pass

class RecipeAdmin(admin.ModelAdmin):
    pass

admin.site.register(CHUser, CHUserAdmin)
admin.site.register(Recipe, RecipeAdmin)