from ..base.irepository import IRepository
from abc import abstractmethod

class IPlatoRepository(IRepository):
    @abstractmethod
    def exists_by_id(self, id):
        pass