import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../componentes/navbar/navbar';
import { Plato, PlatoService } from '../../servicios/plato-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [Navbar, ReactiveFormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {
  private platoService = inject(PlatoService)
  private fb = inject(FormBuilder)

  public searchForm = this.fb.nonNullable.group({
    request: ['']
  })

  public platos: Plato[] = []

  ngOnInit(): void {
      this.platos = this.platoService.getAll()
  }

  public filtrarPorNombre(): void {
    this.platos = this.platoService.getAll()
    let { request } = this.searchForm.getRawValue()
    const results = this.platos.filter(plato => plato.nombre.toLowerCase().includes(request.toLowerCase()))
    this.platos = results
  }
}