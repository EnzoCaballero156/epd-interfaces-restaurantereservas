from .imesa_repository import IMesaRepository
from entities.mesa import Mesa
from utils.misc import db

class MesaRepository(IMesaRepository):
    def find_all(self):
        return Mesa.query.all()

    def find_by_id(self, id):
        return Mesa.query.filter_by(id=id).first()

    def find_all_disponible(self):
        return Mesa.query.filter_by(disponible=True).all()

    def save(self, entity):
        db.session.add(entity)
        db.session.commit()
        return entity

    def delete(self, entity):
        db.session.delete(entity)
        db.session.commit()
        return True