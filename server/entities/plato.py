from utils.misc import db, get_uuid

class Plato(db.Model):
    __tablename__ = "platos"

    id = db.Column(db.Text, primary_key=True, default=get_uuid)

    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    ruta_imagen = db.Column(db.Text, nullable=False)