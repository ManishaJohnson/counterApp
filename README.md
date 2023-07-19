# counterApp
Action: App to increment and decrement a counter

Aim: To learn to deploy django services over Vercel 'https://counterapp-mkj.vercel.app/'










## To deploy html page  

Step1: pip freeze > requirements.txt
Step2: create vercel.json

```json
//here, django project name is counterApp 
{
    "builds": [
      {
        "src": "counterApp/wsgi.py",
        "use": "@vercel/python",
        "config": { "maxLambdaSize": "15mb", "runtime": "python3.9" }
      }
    ],
    "routes": [
      { "src": "/static/(.*)", "dest": "static/$1" },
      { "src": "/(.*)", "dest": "counterApp/wsgi.py" }
    ]
  }
```

Step3: project files shoudl contain settings.py and wsgi.py files

in wsgi

```
application = get_wsgi_application()

app = application
```


in settings.py 
```
ALLOWED_HOSTS = ['.vercel.app','127.0.0.1']

```

Step4: connect github to vercel and deploy

Expectation: html page is read correctly

## To deploy the static files with above html page

Step1: Update vercel.json
```
{
    "version": 2,
    "builds": [
      {
        "src": "counterApp/wsgi.py",
        "use": "@vercel/python",
        "config": { "maxLambdaSize": "15mb", "runtime": "python3.9" }
      },
      {
        "src": "build_files.sh",
        "use": "@vercel/static-build",
        "config": { 
          "distDir": "staticfiles"
        }
      }
    ],
    "routes": [
      { "src": "/static/(.*)", "dest": "static/$1" },
      { "src": "/(.*)", "dest": "counterApp/wsgi.py" }
    ]
  }
```

Step2: Update settings.py
Add static root, direct

Step3: Update urls.py to include static 
```from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT )
```




Stepn: create file build_files.sh

```
pip3 install -r requirements.txt
python3 manage.py collectstatic
```
