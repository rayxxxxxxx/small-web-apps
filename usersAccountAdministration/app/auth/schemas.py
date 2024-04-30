import hashlib

from pydantic import BaseModel


class LoginSchema(BaseModel):
    email: str
    password: str

    def hash_password(self):
        password_hash = hashlib.md5(self.password.encode('utf8')).hexdigest()
        self.password = password_hash


class SignUpSchema(LoginSchema):
    user_name: str
