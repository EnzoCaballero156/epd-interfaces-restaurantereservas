from flask import Blueprint, jsonify, request, send_from_directory, abort
import os

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
        precio = float(request.form['precio'])
        imagen = request.files['imagen']

        folder = os.path.join(os.getcwd(), 'files')

        os.makedirs(folder, exist_ok=True)

        save_route = os.path.join(folder, imagen.filename)
        ruta_imagen = f"files/{imagen.filename}"
        imagen.save(save_route)

        nuevo_plato = plato_service.registrar_plato(nombre, precio, ruta_imagen)
        return jsonify({
            "id": nuevo_plato.id,
            "nombre": nuevo_plato.nombre,
            "precio": nuevo_plato.precio,
            "rutaImagen": nuevo_plato.ruta_imagen
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@plato_bp.delete('/<id>')
def eliminar_plato(id):
    try:
        plato_service.eliminar_plato_por_id(id)
        return jsonify({"mensaje": "Plato eliminado."})
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@plato_bp.get('/files/<filename>')
def get_image_file(filename):
    folder = os.path.abspath('files')
    full_route = os.path.join(folder, filename)
    if not os.path.exists(full_route):
        return abort(404)
    return send_from_directory(folder, filename)