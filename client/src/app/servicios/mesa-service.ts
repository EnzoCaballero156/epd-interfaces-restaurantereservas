import { Injectable } from '@angular/core';

export interface Mesa {
  nombre: string,
  capacidad: number,
  disponible: boolean
}

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  public getAll(): Mesa[] {
    let data = localStorage.getItem('mesas')
    return data ? JSON.parse(data) : []
  }

  public crearMesa(nombre: string, capacidad: number): Mesa {
    let newMesa: Mesa = { nombre, capacidad, disponible: true }
    return newMesa
  }

  public getAllByDisponible(): Mesa[] {
    let data = this.getAll()
    return data.filter(mesa => mesa.disponible)
  }

  public updateMesa(nombre: string): void {
    let data = this.getAll()
    let datosActualizados = data.map(mesa => {
      if (mesa.nombre === nombre) return { ...mesa, disponible: false }
      return mesa
    })
    localStorage.setItem('mesas', JSON.stringify(datosActualizados))
  }

  public addMesa(newMesa: Mesa): void {
    let data = this.getAll()
    data.push(newMesa)
    localStorage.setItem('mesas', JSON.stringify(data))
  }
}
