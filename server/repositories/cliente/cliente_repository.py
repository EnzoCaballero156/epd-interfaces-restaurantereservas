from .icliente_repository import IClienteRepository
from entities.cliente import Cliente
from utils.misc import db

class ClienteRepository(IClienteRepository):
    def find_all(self):
        return Cliente.query.all()

    def find_by_id(self, id):
        return Cliente.query.filter_by(id=id).first()

    def find_by_email(self, email):
        return Cliente.query.filter_by(email=email).first()

    def find_by_email_and_password(self, email, password):
        return Cliente.query.filter_by(email=email, password=password).first()

    def exists_by_id(self, id):
        return Cliente.query.filter_by(id=id).first() is not None

    def exists_by_email(self, email):
        return Cliente.query.filter_by(email=email).first() is not None

    def exists_by_email_and_password(self, email, password):
        return Cliente.query.filter_by(email=email, password=password).first() is not None

    def save(self, entity):
        db.session.add(entity)
        db.session.commit()
        return entity

    def delete(self, entity):
        db.session.delete(entity)
        db.session.commit()
        return True