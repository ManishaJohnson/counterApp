# counterApp
Action: App to increment and decrement a counter

Aim: Learn to deploy django full stack over Vercel 'https://counterapp-mkj.vercel.app/'










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

Step3: project files should contain settings.py and wsgi.py files

in wsgi

```
application = get_wsgi_application()

app = application
```


in settings.py 
```
ALLOWED_HOSTS = ['.vercel.app','127.0.0.1']

# Whitenoise settings
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

import whitenoise

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR, 'templates'],

DEBUG = True       
```

Step4: connect github to vercel and deploy

Expectation: html page is read correctly in deployed url

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
```
ALLOWED_HOSTS = ['.vercel.app', '.now.sh','127.0.0.1','localhost']


STATIC_URL = 'static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
    ]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles', 'static')

use postgre better than sql
```


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



## Good Practise 
To hide the secret_key of your django application
```
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '@ex1u+bahta3k#zng5%*k!cu&qfntf90wun2+nne+3cu31%^-$'
```

This secret key was generated in
```python bash of the [prject path]
>>> from django.core.management.utils import get_random_secret_key
>>> get_random_secret_key()
```
### Youtube Reference for deploy of Fullstack django application
https://www.youtube.com/watch?v=I5x8lAVQ8QQ 

