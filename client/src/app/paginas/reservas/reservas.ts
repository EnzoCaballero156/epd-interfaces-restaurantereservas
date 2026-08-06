import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef)
  public reservas: Reserva[] = []

  ngOnInit(): void {
    this.loadReservas()
  }

  private loadReservas(): void {
    this.reservaService.getAll().subscribe({
      next: reservas => {
        this.reservas = reservas
        this.cdr.detectChanges()
      },
      error: error => alert(error)
    })
  }
}
