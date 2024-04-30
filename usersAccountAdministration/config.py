from pathlib import Path


class Config:
    HOST: str = 'localhost'
    PORT: int = 7000
    SECRET: str = 'super-secret-key-string'
    DB_PATH: Path = Path('data', 'app.db')

    @staticmethod
    def configure_app(app):
        app.config['SECRET'] = Config.SECRET
