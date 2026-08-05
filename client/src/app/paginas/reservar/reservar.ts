import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../componentes/navbar/navbar';
import { DisponibilidadMesas } from '../../componentes/disponibilidad-mesas/disponibilidad-mesas';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaService } from '../../servicios/reserva-service';
import { AuthService } from '../../servicios/auth-service';
import { Mesa, MesaService } from '../../servicios/mesa-service';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [Navbar, DisponibilidadMesas, ReactiveFormsModule],
  templateUrl: './reservar.html',
  styleUrl: './reservar.css',
})

export class Reservar implements OnInit {
  private authService = inject(AuthService)
  private reservaService = inject(ReservaService)
  private mesaService = inject(MesaService)
  private fb = inject(FormBuilder)

  public mesas: Mesa[] = []
  public mesasDisponibles: Mesa[] = []

  public reservaForm = this.fb.nonNullable.group({
    fecha: ['', [Validators.required]],
    hora: ['', [Validators.required]],
    mesa: ['', [Validators.required]]
  })
  
  ngOnInit(): void {
    this.mesas = this.mesaService.getAll()
    this.mesasDisponibles = this.mesaService.getAllByDisponible()
  }

  private ocuparMesa(mesa: string): void {
    this.mesaService.updateMesa(mesa)
    this.mesas = this.mesaService.getAll()
    this.mesasDisponibles = this.mesaService.getAllByDisponible()
  }

  public reservar(): void {
    if (this.reservaForm.invalid) return;
    let { fecha, hora, mesa } = this.reservaForm.getRawValue()
    let { username, email } = this.authService.cargarSesion()!
    let newReserva = this.reservaService.crearReserva(username, email, mesa, fecha, hora)
    this.reservaService.addReserva(newReserva)
    this.ocuparMesa(mesa)
  }
}