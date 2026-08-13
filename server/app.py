from flask_cors import CORS
from config import ApplicationConfig
from utils.builder import AppBuilder
from utils.misc import db, bcrypt
import cloudinary
import os
from dotenv import load_dotenv

from controllers.plato_controller import plato_bp
from controllers.mesa_controller import mesa_bp
from controllers.reserva_controller import reserva_bp
from controllers.cliente_controller import cliente_bp
from controllers.auth_controller import auth_bp

load_dotenv()

app = (
    AppBuilder()
        .create_app(__name__)
        .configure(ApplicationConfig)
        .register_bp(plato_bp, url_prefix="/api/platos")
        .register_bp(mesa_bp, url_prefix="/api/mesas")
        .register_bp(reserva_bp, url_prefix="/api/reservas")
        .register_bp(cliente_bp, url_prefix="/api/clientes")
        .register_bp(auth_bp, url_prefix="/api/auth")
        .build()
)

CORS(app, supports_credentials=True)
bcrypt.init_app(app)
db.init_app(app)

cloudinary.config(
    cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key = os.getenv('CLOUDINARY_API_KEY'),
    api_secret = os.getenv('CLOUDINARY_API_SECRET'),
    secure = True
)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run()