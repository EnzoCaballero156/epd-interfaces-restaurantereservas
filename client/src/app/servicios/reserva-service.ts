import { Injectable } from '@angular/core';

export interface Reserva {
  cliente: string,
  correo: string,
  mesa: string,
  fecha: string,
  hora: string
}

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  public getAll(): Reserva[] {
    let data = localStorage.getItem('reservas')
    return data ? JSON.parse(data) : []
  } 

  public crearReserva(cliente: string, correo: string, mesa: string, fecha: string, hora: string): Reserva {
    let reserva: Reserva = { cliente, correo, mesa, fecha, hora }
    return reserva
  }

  public addReserva(newReserva: Reserva): void {
    let data: Reserva[] = this.getAll()
    data.push(newReserva)
    localStorage.setItem('reservas', JSON.stringify(data))
  }
}
