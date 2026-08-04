import { Injectable } from '@angular/core';

export interface Plato {
  nombre: string,
  precio: number,
  rutaImagen: string
}

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  public getAll(): Plato[] {
      let data = localStorage.getItem('platos')
      return data ? JSON.parse(data) : []
    }

  public crearPlato(nombre: string, precio: number): Plato {
    let newPlato: Plato = { nombre, precio, rutaImagen: "../assets/plato.png" }
    return newPlato
  }

  public addPlato(newPlato: Plato): void {
    let data = this.getAll()
    data.push(newPlato)
    localStorage.setItem('platos', JSON.stringify(data))
  }

  public eliminarPlato(nombre: string): void {
    let data = this.getAll()
    let newData = data.filter(item => item.nombre !== nombre)
    localStorage.setItem('platos', JSON.stringify(newData))
  }
}
