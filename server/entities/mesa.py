from utils.misc import db

class Mesa(db.Model):
    __tablename__ = "mesas"
    
    id = db.Column(db.Integer, primary_key=True)

    nombre = db.Column(db.String(50), nullable=False)
    capacidad = db.Column(db.Integer, nullable=False, default=1)
    disponible = db.Column(db.Boolean, nullable=False, default=True)