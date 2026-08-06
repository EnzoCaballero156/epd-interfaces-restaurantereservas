from repositories.mesa.imesa_repository import IMesaRepository
from entities.mesa import Mesa

class MesaService:
    def __init__(self, mesa_repository: IMesaRepository):
        self.mesa_repository = mesa_repository

    def obtener_mesas(self):
        return self.mesa_repository.find_all()

    def obtener_mesas_disponibles(self):
        return self.mesa_repository.find_all_disponible()
    
    def obtener_mesa_por_id(self, id):
        return self.mesa_repository.find_by_id(id)

    def registrar_mesa(self, nombre, capacidad):
        if not nombre or not capacidad:
            raise Exception("Datos incompletos.")
        mesa = Mesa(nombre=nombre, capacidad=capacidad)
        return self.mesa_repository.save(mesa)

    def actualizar_mesa(self, id):
        mesa = self.mesa_repository.find_by_id(id)
        mesa.disponible = False
        return self.mesa_repository.save(mesa)