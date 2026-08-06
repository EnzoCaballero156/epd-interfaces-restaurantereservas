from repositories.cliente.icliente_repository import IClienteRepository
from entities.cliente import Cliente

class ClienteService:
    def __init__(self, cliente_repository: IClienteRepository):
        self.cliente_repository = cliente_repository

    def obtener_clientes(self):
        return self.cliente_repository.find_all()

    def obtener_cliente_por_email(self, email):
        return self.cliente_repository.find_by_email(email)

    def obtener_cliente_por_email_y_password(self, email):
        return self.cliente_repository.find_by_email_and_password(email)

    def cliente_existe_por_email(self, email):
        return self.cliente_repository.exists_by_email(email)

    def registrar_cliente(self, username, email, password):
        if not username or not email or not password:
            raise Exception("Datos incompletos.")

        nuevo_cliente = Cliente(username=username, email=email, password=password)
        return self.cliente_repository.save(nuevo_cliente)