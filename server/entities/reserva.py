from utils.misc import db, get_uuid

class Reserva(db.Model):
    __tablename__ = "reservas"

    id = db.Column(db.Text, primary_key=True, default=get_uuid)
    cliente_id = db.Column(db.Text, db.ForeignKey('clientes.id'), nullable=False)
    mesa_id = db.Column(db.Text, db.ForeignKey('mesas.id'), nullable=False)

    fecha = db.Column(db.Text, nullable=False)
    hora = db.Column(db.Text, nullable=False)

    cliente = db.relationship('Cliente', back_populates='reservas')
    mesa = db.relationship('Mesa', back_populates='reserva')