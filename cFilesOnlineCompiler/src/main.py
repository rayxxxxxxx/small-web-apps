from flask import Flask

from home.home import home
from about import about

UPLOAD_FOLDER = 'src/upload_files'

app = Flask(__name__)

app.register_blueprint(home)
app.register_blueprint(about)
