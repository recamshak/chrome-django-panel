==================
Django Debug Panel (chrome extension)
==================

Django Debug Toolbar inside WebKit DevTools. Works fine with background AJAX requests and non-HTML responses.
Great for single-page applications and other AJAX intensive web applications.

Installation
============

#. Install and configure `Django Debug Toolbar <https://github.com/django-debug-toolbar/django-debug-toolbar>`_

#. Install `Django Debug Panel`::

    pip install django-debug-panel

#. Add ``debug_panel`` to your ``INSTALLED_APPS`` setting::

    INSTALLED_APPS = (
        # ...
        'debug_panel',
    )

#. Replace ``debug-toolbar`` middleware with ``debug-panel`` middleware in your ``MIDDLEWARE_CLASSES`` setting:

    MIDDLEWARE_CLASSES = (
        # 'debug_toolbar.middleware.DebugToolbarMiddleware',
        'debug_panel.middleware.DebugPanelMiddleware',
        # ...
    )
    
#. Run ``python manage.py syncdb`` to create the table that store debug information

#. Install the Chrome extension `Django Debug Panel <https://chrome.google.com/webstore/detail/django-debug-panel/nbiajhhibgfgkjegbnflpdccejocmbbn>`_
