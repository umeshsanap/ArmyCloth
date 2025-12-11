from django.shortcuts import render

def index(request):
    """Main page view"""
    return render(request, 'store/index.html')

