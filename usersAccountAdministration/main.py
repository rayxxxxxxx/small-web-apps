from pathlib import Path
from flask import Flask

from config import Config
from app.auth.router import router as auth
from app.profile.router import router as profile

if __name__ == '__main__':
    app = Flask(__name__)

    Config.configure_app(app)
    app.template_folder = Path('app', 'templates')
    app.static_folder = Path('app', 'static')

    app.register_blueprint(auth)
    app.register_blueprint(profile)

    app.run(host=Config.HOST, port=Config.PORT, debug=True)
