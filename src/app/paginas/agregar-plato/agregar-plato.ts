import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../componentes/navbar/navbar';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Plato, PlatoService } from '../../servicios/plato-service';

@Component({
  selector: 'app-agregar-plato',
  imports: [Navbar, ReactiveFormsModule],
  templateUrl: './agregar-plato.html',
  styleUrl: './agregar-plato.css',
})
export class AgregarPlato implements OnInit {
  private platoService = inject(PlatoService)
  private fb = inject(FormBuilder)

  public platoForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    precio: [0.0, [Validators.required]],
  })

  public platos: Plato[] = []

  ngOnInit(): void {
      this.platos = this.platoService.getAll()
  }

  public publicar(): void {
    if (this.platoForm.invalid) return
    let { nombre, precio } = this.platoForm.getRawValue()
    let newPlato = this.platoService.crearPlato(nombre, precio)
    this.platoService.addPlato(newPlato)
    this.platos = this.platoService.getAll()
  }

  public eliminar(nombrePlato: string): void {
    this.platoService.eliminarPlato(nombrePlato)
    this.platos = this.platoService.getAll()
  }
}
