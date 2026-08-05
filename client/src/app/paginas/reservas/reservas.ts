import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../componentes/navbar/navbar';
import { DisponibilidadMesas } from '../../componentes/disponibilidad-mesas/disponibilidad-mesas';
import { Reserva, ReservaService } from '../../servicios/reserva-service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [Navbar],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
})
export class Reservas implements OnInit {
  private reservaService = inject(ReservaService)
  public reservas: Reserva[] = []

  ngOnInit(): void {
    this.reservas = this.reservaService.getAll()
  }
}
