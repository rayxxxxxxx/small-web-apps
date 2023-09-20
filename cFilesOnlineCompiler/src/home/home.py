import os

from flask import Blueprint, url_for, render_template
from flask import request
from flask import send_file

from werkzeug.utils import secure_filename

ALLOWED_EXTENSTIONS = {'c'}

home = Blueprint('home', __name__, static_folder='./static',
                 template_folder='./templates', url_prefix='/home')


@home.route('/')
def get_home():
    print(os.getcwd())
    return render_template('home.html')


@home.post('/')
def compile():
    if 'usr_file' not in request.files:
        return 0

    can_download = False

    file = request.files['usr_file']
    if file.filename.split('.')[1] in ALLOWED_EXTENSTIONS:
        fname = secure_filename(file.filename)
        fpath = f'./src/downloads/{fname}'
        file.save(fpath)

        print(os.getcwd())
        os.system(f'gcc {fpath} -o ./src/uploads/a.out')
        os.system(f'gzip -c ./src/uploads/a.out > ./src/uploads/out.zip')

        can_download = True

    return render_template('home.html', can_download=can_download)


@home.route('/download')
def download():
    return send_file(path_or_file=f'./uploads/out.zip', download_name='out.zip', as_attachment=True)
