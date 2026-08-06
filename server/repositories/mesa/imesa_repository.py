from ..base.irepository import IRepository
from abc import abstractmethod

class IMesaRepository(IRepository):
    @abstractmethod
    def find_all_disponible(self):
        pass