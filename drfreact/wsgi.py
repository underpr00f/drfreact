"""
WSGI config for drfreact project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see

https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/

"""

import os

from django.core.wsgi import get_wsgi_application

<<<<<<< HEAD
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drfreact.settings')
=======
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "drfreact.settings")
>>>>>>> ef351aa248ebf3e8bf75610af247d338f932f722

application = get_wsgi_application()
