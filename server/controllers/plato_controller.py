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
        "id": plato.id,
        "nombre": plato.nombre,
        "precio": plato.precio,
        "rutaImagen": plato.ruta_imagen
    } for plato in platos])

@plato_bp.post('/')
def registrar_plato():
    try:
        nombre = request.form['nombre']
        precio = request.form['precio']
        imagen = request.files['imagen']

        extension = imagen.filename.rsplit('.', 1)[1]

        nuevo_plato = plato_service.registrar_plato(datos)
        return jsonify({
            "id": nuevo_plato.id,
            "nombre": nuevo_plato.nombre,
            "precio": nuevo_plato.precio,
            "rutaImagen": nuevo_plato.ruta_imagen
        })
    except Exception as e:
        return jsonify({"error": f"No se pudo realizar la operación. {e}"}), 401

@plato_bp.delete('/<int:id>')
def eliminar_plato(id):
    try:
        plato_service.eliminar_plato_por_id(id)
        return jsonify({"mensaje": "Plato eliminado."})
    except Exception as e:
        return jsonify({"error": f"No se pudo realizar la operación. {e}"}), 401
