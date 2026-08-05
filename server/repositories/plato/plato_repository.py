from .iplato_repository import IPlatoRepository
from entities.plato import Plato
from utils.misc import db

class PlatoRepository(IPlatoRepository):
    def find_all(self):
        return Plato.query.all()

    def find_by_id(self, id):
        return Plato.query.filter_by(id=id).first()

    def exists_by_id(self, id):
        return Plato.query.filter_by(id=id).first() is not None

    def save(self, entity):
        db.session.add(entity)
        db.session.commit()
        return entity

    def delete(self, entity):
        db.session.delete(entity)
        db.session.commit()
        return True