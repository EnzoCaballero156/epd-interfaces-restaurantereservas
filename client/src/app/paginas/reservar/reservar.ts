import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../componentes/navbar/navbar';
import { DisponibilidadMesas } from '../../componentes/disponibilidad-mesas/disponibilidad-mesas';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaService } from '../../servicios/reserva-service';
import { Mesa, MesaService } from '../../servicios/mesa-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [Navbar, DisponibilidadMesas, ReactiveFormsModule],
  templateUrl: './reservar.html',
  styleUrl: './reservar.css',
})

export class Reservar implements OnInit {
  private reservaService = inject(ReservaService)
  private mesaService = inject(MesaService)

  private cdr = inject(ChangeDetectorRef)
  private fb = inject(FormBuilder)

  public mesas: Mesa[] = []
  public mesasDisponibles: Mesa[] = []

  public reservaForm = this.fb.nonNullable.group({
    mesaID: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    hora: ['', [Validators.required]]
  })
  
  ngOnInit(): void {
    this.loadMesas()
    this.loadMesasDisponibles()
  }

  private loadMesas(): void {
    this.mesaService.getAll().subscribe({
      next: mesas => {
        this.mesas = mesas
        this.cdr.detectChanges()
      },
      error: error => alert(error)
    })
  }

  private loadMesasDisponibles(): void {
    this.mesaService.getAllByDisponible().subscribe({
      next: mesasDisponibles => {
        this.mesasDisponibles = mesasDisponibles
        this.cdr.detectChanges()
      },
      error: error => alert(error)
    })
  }

  public reservar(): void {
    if (this.reservaForm.invalid) return;
    let { mesaID, fecha, hora } = this.reservaForm.getRawValue()
    this.reservaService.registrarReserva(mesaID, fecha, hora).pipe(
      switchMap(() => this.mesaService.actualizarMesa(mesaID))
    ).subscribe({
      next: () => {
        this.loadMesas()
        this.loadMesasDisponibles()
      },
      error: error => alert(error)
    })
  }
}