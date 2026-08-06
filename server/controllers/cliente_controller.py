from flask import Blueprint, jsonify, request

from repositories.cliente.cliente_repository import ClienteRepository
from services.cliente_service import ClienteService

cliente_bp = Blueprint('cliente_bp', __name__)

cliente_repository = ClienteRepository()
cliente_service = ClienteService(cliente_repository)

@cliente_bp.get('/')
def obtener_clientes():
    clientes = cliente_service.obtener_clientes()
    return jsonify([{
        "id": cliente.id,
        "username": cliente.username,
        "email": cliente.email
    } for cliente in clientes])