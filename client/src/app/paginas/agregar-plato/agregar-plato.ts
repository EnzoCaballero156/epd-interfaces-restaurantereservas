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

  public loadPlatos(): void {
    this.platoService.getAll().subscribe({
      next: platos => {
        this.platos = platos
        this.cdr.detectChanges()
      },
      error: error => alert(error)
    })
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
    this.platoService.addPlato(nombre, precio).subscribe({
      next: plato => this.platos.push(plato),
      error: error => alert(error)
    })
    this.loadPlatos()
  }

  public eliminar(nombrePlato: string): void {
    // this.platoService.eliminarPlato(nombrePlato)
    // this.platos = this.platoService.getAll()
  }
}
