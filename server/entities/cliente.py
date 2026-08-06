from utils.misc import db, get_uuid

class Cliente(db.Model):
    __tablename__ = "clientes"

    id = db.Column(db.Text, primary_key=True, default=get_uuid)

    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    password = db.Column(db.Text, nullable=False)

    reservas = db.relationship('Reserva', back_populates='cliente', cascade='all, delete-orphan')