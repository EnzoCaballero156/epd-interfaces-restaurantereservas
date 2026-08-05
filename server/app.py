from flask import Flask, jsonify
from flask_cors import CORS
from config import ApplicationConfig
from utils.misc import db, bcrypt
from controllers.plato_controller import plato_bp

app = Flask(__name__)
CORS(app, supports_credentials=True)
bcrypt.init_app(app)
app.config.from_object(ApplicationConfig)
db.init_app(app)

app.register_blueprint(plato_bp, url_prefix="/api/platos")

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)