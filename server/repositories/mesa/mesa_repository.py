from .imesa_repository import IMesaRepository
from entities.mesa import Mesa
from utils.misc import db

class MesaRepository(IMesaRepository):
    def find_all():
        return Mesa.query.all()

    def find_by_id(self, id):
        return Mesa.query.filter_by(id=id).first()

    def save(self, entity):
        db.session.add(entity)
        db.session.commit()
        return entity

    def delete(self, entity):
        db.session.delete(entity)
        db.session.commit()
        return True