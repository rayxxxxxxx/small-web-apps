from flask import Blueprint
from flask import render_template
from flask import request, make_response, url_for

home = Blueprint('home', __name__, static_folder='../pages/home/static',
                 static_url_path='/home/static', template_folder='../pages/home/templates', url_prefix='/home')


@home.get('/')
def main():
    return render_template('home.html')
