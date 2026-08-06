from flask import Blueprint, jsonify, request

from repositories.mesa.mesa_repository import MesaRepository
from services.mesa_service import MesaService

mesa_bp = Blueprint("mesa_bp", __name__)

mesa_repository = MesaRepository()
mesa_service = MesaService(mesa_repository)

@mesa_bp.get('/')
def obtener_mesas():
    mesas = mesa_service.obtener_mesas()
    return jsonify([{
        "id": mesa.id,
        "nombre": mesa.nombre,
        "capacidad": mesa.capacidad,
        "disponible": mesa.disponible
    } for mesa in mesas])

@mesa_bp.get('/disponible')
def obtener_mesas_disponibles():
    mesas_disponibles = mesa_service.obtener_mesas_disponibles()
    return jsonify([{
        "id": mesa.id,
        "nombre": mesa.nombre,
        "capacidad": mesa.capacidad,
        "disponible": mesa.disponible
    } for mesa in mesas_disponibles])

@mesa_bp.post('/')
def registrar_mesa():
    try:
        data = request.get_json()
        nombre = data.get('nombre')
        capacidad = data.get('capacidad')

        nueva_mesa = mesa_service.registrar_mesa(nombre, capacidad)
        return jsonify({
            "id": nueva_mesa.id,
            "nombre": nueva_mesa.nombre,
            "capacidad": nueva_mesa.capacidad,
            "disponible": nueva_mesa.disponible
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@mesa_bp.patch('/<id>')
def actualizar_mesa(id):
    mesa_actualizada = mesa_service.actualizar_mesa(id)
    return jsonify({
        "id": mesa_actualizada.id,
        "nombre": mesa_actualizada.nombre,
        "capacidad": mesa_actualizada.capacidad,
        "disponible": mesa_actualizada.disponible
    })