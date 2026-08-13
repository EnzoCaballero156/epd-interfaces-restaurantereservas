import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { Navbar } from '../../componentes/navbar/navbar';
import { Plato, PlatoService } from '../../servicios/plato-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [Navbar, ReactiveFormsModule, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {
  private platoService = inject(PlatoService)
  private cdr = inject(ChangeDetectorRef)
  private fb = inject(FormBuilder)

  public searchForm = this.fb.nonNullable.group({
    request: ['']
  })

  public platosData: Plato[] = []
  public platos: Plato[] = []

  ngOnInit(): void {
      this.loadPlatos()
  }

  private loadPlatos(): void {
    this.platoService.getAll().subscribe({
      next: data => {
          this.platosData = data
          this.platos = data
          this.cdr.detectChanges()
      },
      error: error => alert(error)
    })
  }

  public rutaImagen(ruta: string) {
    return this.platoService.getImagePath(ruta)
  }

  public filtrarPorNombre(): void {
    let { request } = this.searchForm.getRawValue()
    const results = this.platosData.filter(plato => plato.nombre.toLowerCase().includes(request.toLowerCase()))
    this.platos = results;
    this.cdr.detectChanges();
  }
}