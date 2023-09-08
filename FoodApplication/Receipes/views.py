from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Receipe
from .serailizers import ReceipeSerializer
import datetime
# Create your views here.
class ReceipeDetails(APIView):
    def get(self,request):
        obj=Receipe.objects.all()
        serializer=ReceipeSerializer(obj,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer=ReceipeSerializer(data=request.data)
        # try:
        #     serializer=ReceipeSerializer(data=request.data)
        # except:
        #     print("something is wrong")
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class ReceipesInfo(APIView):
    def get(self,request,id):
        try:
            obj=Receipe.objects.get(id=id)
        except Receipe.DoesNotExist:
            msg={"msg":"not found"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        serializer=ReceipeSerializer(obj)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def put(self,request,id):
        try:
            obj=Receipe.objects.get(id=id)
        except Receipe.DoesNotExist:
            msg={"msg":"not found"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        serializer=ReceipeSerializer(obj,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self,request,id):
        try:
            obj=Receipe.objects.get(id=id)
        except Receipe.DoesNotExist:
            msg={"msg":"not found"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        serializer=ReceipeSerializer(obj,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self,request,id):
        try:
            obj=Receipe.objects.get(id=id)
        except Receipe.DoesNotExist:
            msg={"msg":"not found"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        obj.delete()
        return Response({"msg":"deleted"},status=status.HTTP_204_NO_CONTENT)
    
class Fetching(APIView):
    def get(self,request,week):
        if(week=="thisweek"):
            date=datetime.date.today()
            start_week=date-datetime.timedelta(date.weekday())
            end_week=start_week+datetime.timedelta(7)
            try:
                obj=Receipe.objects.filter(datee__range=[start_week,end_week])
            except Receipe.DoesNotExist:
                msg={"msg":"not found"}
                return Response(msg,status=status.HTTP_404_NOT_FOUND)
            serializer=ReceipeSerializer(obj,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        elif(week=="lastweek"):
            date=datetime.date.today()-datetime.timedelta(7)
            start_week=date-datetime.timedelta(date.weekday())
            end_week=start_week+datetime.timedelta(6)
            try:
                  obj=Receipe.objects.filter(datee__range=[start_week,end_week])
            except Receipe.DoesNotExist:
                msg={"msg":"not found"}
                return Response(msg,status=status.HTTP_404_NOT_FOUND)
            serializer=ReceipeSerializer(obj,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            obj=Receipe.objects.all()
            serializer=ReceipeSerializer(obj,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)