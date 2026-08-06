from flask import session
from utils.misc import bcrypt

from repositories.cliente.icliente_repository import IClienteRepository
from entities.cliente import Cliente

class AuthService:
    def __init__(self, cliente_repository: IClienteRepository):
        self.cliente_repository = cliente_repository

    def __crear_sesion(self, user_id):
        session['user_id'] = user_id
        session.permanent = True
        session.modified = True

    def cargar_sesion(self, user_id):
        if user_id is None:
            raise Exception("No autorizado.")

        if user_id == "admin":
            return {"id": "admin", "email": "admin@admin.xyz"}

        if not self.cliente_repository.exists_by_id(user_id):
            session.pop('user_id', None)
            raise Exception("No autorizado.")

        data = self.cliente_repository.find_by_id(user_id)
        return {"id": data.id, "email": data.email}

    def register(self, username, email, password):
        if not username or not email or not password:
            raise Exception("Datos incompletos.")

        if username == "admin" or email == "admin@admin.xyz":
            raise Exception("No autorizado.")

        if self.cliente_repository.exists_by_email(email):
            raise Exception("El usuario ya existe.")

        hashed_password = bcrypt.generate_password_hash(password)
        nuevo_cliente = Cliente(username=username, email=email, password=hashed_password)
        self.cliente_repository.save(nuevo_cliente)
        self.__crear_sesion(nuevo_cliente.id)
        print(nuevo_cliente.id, nuevo_cliente.email)
        return {"id": nuevo_cliente.id, "email": nuevo_cliente.email}

    def login(self, email, password):
        if email == "admin@admin.xyz" and password == "admin":
            self.__crear_sesion("admin")
            return {"id": "admin", "email": "admin@admin.xyz"}
        
        data = self.cliente_repository.find_by_email(email)
        if not data or not bcrypt.check_password_hash(data.password, password):
            raise Exception("Credenciales incorrectas.")

        self.__crear_sesion(data.id)
        return {"id": data.id, "email": data.email}

    def logout(self):
        session.pop('user_id', None)
        return True