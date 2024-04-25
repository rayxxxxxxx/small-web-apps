from pathlib import Path
from flask import Flask

from config import Config
from app.authentication.auth import auth


if __name__ == '__main__':
    app = Flask(__name__)

    Config.configure_app(app)
    app.template_folder = Path('app', 'templates')
    app.static_folder = Path('app', 'static')

    app.register_blueprint(auth)

    app.run(host=Config.HOST, port=Config.PORT, debug=True)
