from .views import ReceipeDetails,ReceipesInfo,Fetching
from django.urls import path

urlpatterns=[
    path('rec/',ReceipeDetails.as_view(),name="rec"),
    path('recc/<int:id>/',ReceipesInfo.as_view()),
    path('fetching/<str:week>/',Fetching.as_view())
]