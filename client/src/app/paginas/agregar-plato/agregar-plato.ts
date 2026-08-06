import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../componentes/navbar/navbar';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Plato, PlatoService } from '../../servicios/plato-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-plato',
  imports: [Navbar, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-plato.html',
  styleUrl: './agregar-plato.css',
})
export class AgregarPlato implements OnInit {
  private platoService = inject(PlatoService)
  private cdr = inject(ChangeDetectorRef)
  private fb = inject(FormBuilder)

  public imagen: File | null = null;

  public platoForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    precio: [0.0, [Validators.required]],
  })

  public platos: Plato[] = []

  ngOnInit(): void {
    this.loadPlatos()
  }

  private loadPlatos(): void {
    this.platoService.getAll().subscribe({
      next: platos => {
        this.platos = platos
        this.cdr.detectChanges()
      },
      error: error => alert(error)
    })
  }

  public rutaImagen(ruta: string) {
    return this.platoService.getImagePath(ruta)
  }

  public handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      this.imagen = target.files[0]
    }
  }

  public publicar(): void {
    if (this.platoForm.invalid || !this.imagen) return
    let { nombre, precio } = this.platoForm.getRawValue()

    const formData = new FormData()
    formData.append("nombre", nombre)
    formData.append("precio", precio.toString())
    formData.append("imagen", this.imagen, this.imagen.name)

    this.platoService.agregarPlato(formData).subscribe({
      next: plato => {
        this.platos.push(plato)
        this.loadPlatos()
      },
      error: error => alert(error)
    })
  }

  public eliminar(id: string): void {
    this.platoService.eliminarPlatoPorID(id).subscribe({
      next: () => this.loadPlatos(),
      error: error => alert(error)
    })
  }
}
