from .ireserva_repository import IReservaRepository
from entities.reserva import Reserva
from utils.misc import db

class ReservaRepository(IReservaRepository):
    def find_all(self):
        return Reserva.query.all()

    def find_by_id(self, id):
        return Reserva.query.filter_by(id=id).first()

    def save(self, entity):
        db.session.add(entity)
        db.session.commit()
        return entity

    def delete(self, entity):
        db.session.delete(entity)
        db.session.commit()
        return True