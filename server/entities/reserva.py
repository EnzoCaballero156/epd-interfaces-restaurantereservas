from utils.misc import db

class Reserva(db.Model):
    __tablename__ = "reservas"

    id = db.Column(db.Integer, primary_key=True)

    cliente = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(150), nullable=False)
    mesa = db.Column(db.String(50), nullable=False)
    fecha = db.Column(db.Text, nullable=False)
    hora = db.Column(db.Text, nullable=False)