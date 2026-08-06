from utils.misc import db, get_uuid

class Mesa(db.Model):
    __tablename__ = "mesas"
    
    id = db.Column(db.Text, primary_key=True, default=get_uuid)

    nombre = db.Column(db.String(50), nullable=False)
    capacidad = db.Column(db.Integer, nullable=False, default=1)
    disponible = db.Column(db.Boolean, nullable=False, default=True)

    reserva = db.relationship('Reserva', back_populates='mesa', cascade='all, delete-orphan')