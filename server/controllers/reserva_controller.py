from flask import Blueprint, request, jsonify, session

from repositories.reserva.reserva_repository import ReservaRepository
from repositories.cliente.cliente_repository import ClienteRepository
from repositories.mesa.mesa_repository import MesaRepository
from services.reserva_service import ReservaService

reserva_bp = Blueprint('reserva_bp', __name__)

reserva_repository = ReservaRepository()
cliente_repository = ClienteRepository()
mesa_repository = MesaRepository()
reserva_service = ReservaService(reserva_repository, cliente_repository, mesa_repository)

@reserva_bp.get('/')
def obtener_reservas():
    reservas = reserva_service.obtener_reservas()
    return jsonify([{
        "id": reserva.id,
        "cliente": reserva.cliente.username,
        "correo": reserva.cliente.email,
        "mesa": reserva.mesa.nombre,
        "fecha": reserva.fecha,
        "hora": reserva.hora
    } for reserva in reservas])

@reserva_bp.post('/')
def realizar_reserva():
    try:
        data = request.get_json()
        cliente_id = session.get('user_id')
        mesa_id = data.get('mesaID')
        fecha = data.get('fecha')
        hora = data.get('hora')
        
        nueva_reserva = reserva_service.realizar_reserva(cliente_id, mesa_id, fecha, hora)
        return jsonify({
            "id": nueva_reserva.id,
            "cliente": nueva_reserva.cliente.username,
            "correo": nueva_reserva.cliente.email,
            "mesa": nueva_reserva.mesa.nombre,
            "fecha": nueva_reserva.fecha,
            "hora": nueva_reserva.hora
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 401