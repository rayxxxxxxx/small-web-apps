from pathlib import Path
from flask import Flask

from config import Config
from app.authentication.routes import auth as auth_blueprint


if __name__ == '__main__':
    app = Flask(__name__)

    Config.configure_app(app)
    app.template_folder = Path('app', 'templates')
    app.static_folder = Path('app', 'static')

    app.register_blueprint(auth_blueprint)

    app.run(host=Config.HOST, port=Config.PORT, debug=True)
