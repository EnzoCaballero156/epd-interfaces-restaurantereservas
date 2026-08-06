import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../componentes/navbar/navbar';
import { DisponibilidadMesas } from '../../componentes/disponibilidad-mesas/disponibilidad-mesas';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mesa, MesaService } from '../../servicios/mesa-service';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [Navbar, DisponibilidadMesas, ReactiveFormsModule],
  templateUrl: './mesas.html',
  styleUrl: './mesas.css',
})
export class Mesas implements OnInit {
  private mesaService = inject(MesaService)
  private cdr = inject(ChangeDetectorRef)
  private fb = inject(FormBuilder)

  public mesas: Mesa[] = []

  public mesaForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    capacidad: [1, [Validators.required]]
  })

  ngOnInit(): void {
    this.loadMesas()
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

  public agregarMesa(): void {
    if (this.mesaForm.invalid) return
    let { nombre, capacidad } = this.mesaForm.getRawValue()
    this.mesaService.agregarMesa(nombre, capacidad).subscribe({
      next: mesa => {
        this.mesas.push(mesa)
        this.loadMesas()
      },
      error: error => alert(error)
    })
  }
}
