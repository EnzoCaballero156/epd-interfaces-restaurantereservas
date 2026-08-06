from flask import Blueprint, jsonify, request, session

from repositories.cliente.cliente_repository import ClienteRepository
from services.auth_service import AuthService

auth_bp = Blueprint('auth_bp', __name__)

cliente_repository = ClienteRepository()
auth_service = AuthService(cliente_repository)

@auth_bp.get('/@me')
def cargar_sesion():
    try:
        user_id = session.get('user_id')
        sesion = auth_service.cargar_sesion(user_id)
        return jsonify(sesion)
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@auth_bp.post('/register')
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        sesion = auth_service.register(username, email, password)
        return jsonify(sesion)
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@auth_bp.post('/login')
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        print(email, password)
        sesion = auth_service.login(email, password)
        return jsonify(sesion)
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@auth_bp.post('/logout')
def logout():
    return jsonify({"logOut": auth_service.logout()})