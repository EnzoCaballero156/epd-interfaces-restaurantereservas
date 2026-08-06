from repositories.reserva.ireserva_repository import IReservaRepository
from repositories.cliente.icliente_repository import IClienteRepository
from repositories.mesa.imesa_repository import IMesaRepository
from entities.reserva import Reserva

class ReservaService:
    def __init__(
            self, 
            reserva_repository: IReservaRepository,
            cliente_repository: IClienteRepository,
            mesa_repository: IMesaRepository
            ):
        self.reserva_repository = reserva_repository
        self.cliente_repository = cliente_repository
        self.mesa_repository = mesa_repository

    def obtener_reservas(self):
        return self.reserva_repository.find_all()

    def realizar_reserva(self, cliente_id, mesa_id, fecha, hora):
        if not cliente_id or not mesa_id or not fecha or not hora:
            raise Exception("Datos incompletos.")
        cliente = self.cliente_repository.find_by_id(cliente_id)
        mesa = self.mesa_repository.find_by_id(mesa_id)
        nueva_reserva = Reserva(cliente=cliente, mesa=mesa, fecha=fecha, hora=hora)
        return self.reserva_repository.save(nueva_reserva)
