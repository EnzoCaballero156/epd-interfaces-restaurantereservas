from entities.plato import Plato
from repositories.plato.iplato_repository import IPlatoRepository

class PlatoService:
    def __init__(self, plato_repository: IPlatoRepository):
        self.plato_repository = plato_repository

    def obtener_platos(self):
        return self.plato_repository.find_all()

    def obtener_plato_por_id(self, id):
        return self.plato_repository.find_by_id(id)

    def registrar_plato(self, nombre, precio, ruta_imagen):
        if not nombre or not precio or not ruta_imagen:
            raise Exception("Datos incompletos.")
        plato = Plato(nombre=nombre, precio=precio, ruta_imagen=ruta_imagen)
        return self.plato_repository.save(plato)

    def eliminar_plato_por_id(self, id):
        if not self.plato_repository.exists_by_id(id):
            raise Exception("Plato no encontrado.")
        
        plato = self.plato_repository.find_by_id(id)
        return self.plato_repository.delete(plato)