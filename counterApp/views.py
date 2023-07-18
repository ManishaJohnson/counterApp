from django.shortcuts import render, HttpResponse

# Create your views here.
def index(request):
	count = 10
	return render(request, 'counter.html', {'count': count})