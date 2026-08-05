from flask import Blueprint, jsonify, request

from repositories.plato.plato_repository import PlatoRepository
from services.plato_service import PlatoService

plato_bp = Blueprint("plato_bp", __name__)

plato_repository = PlatoRepository()
plato_service = PlatoService(plato_repository)

@plato_bp.get('/')
def obtener_platos():
    platos = plato_service.obtener_platos()
    return jsonify([{
            "nombre": plato.nombre,
            "precio": plato.precio,
            "rutaImagen": plato.ruta_imagen
    } for plato in platos])

@plato_bp.post('/')
def registrar_plato():
    try:
        datos = request.get_json()
        nuevo_plato = plato_service.registrar_plato(datos)
        return jsonify({
            "id": nuevo_plato.id,
            "nombre": nuevo_plato.nombre,
            "precio": nuevo_plato.precio,
            "rutaImagen": nuevo_plato.ruta_imagen
        })
    except Exception as e:
        return jsonify({"error": f"No se pudo realizar la operación. {e}"}), 401

