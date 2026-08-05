from utils.misc import db

class Plato(db.Model):
    __tablename__ = "platos"

    id = db.Column(db.Integer, primary_key=True, nullable=False)

    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    ruta_imagen = db.Column(db.Text, nullable=False)