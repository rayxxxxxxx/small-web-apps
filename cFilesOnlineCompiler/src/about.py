from flask import Blueprint, url_for, render_template

about = Blueprint('about', __name__, static_folder='./static',
                  template_folder='./templates', url_prefix='/about')


@about.route('/')
def get_about():
    return render_template('about.html')
