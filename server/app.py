from flask import send_from_directory
from flask_cors import CORS
from config import ProductionConfig
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

from waitress import serve

load_dotenv()

app = (
    AppBuilder()
        .create_app(__name__)
        .configure(ProductionConfig)
            .set_static_folder("../client/dist/restaurante-reservas/browser")
            .set_static_url_path("/")
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

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def soporte(path):
    # verificar si archivos fisicos existen en dist
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=5000)