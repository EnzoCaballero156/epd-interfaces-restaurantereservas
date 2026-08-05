from .icliente_repository import IClienteRepository
from entities.cliente import Cliente
from utils.misc import db

class ClienteRepository(IClienteRepository):
    def find_all():
        return Cliente.query.all()

    def find_by_id(self, id):
        return Cliente.query.filter_by(id=id).first()

    def save(self, entity):
        db.session.add(entity)
        db.session.commit()
        return entity

    def delete(self, entity):
        db.session.delete(entity)
        db.session.commit()
        return True