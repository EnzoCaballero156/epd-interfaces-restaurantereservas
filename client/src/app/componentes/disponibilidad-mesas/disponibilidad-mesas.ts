import { Component, inject, Input, OnInit } from '@angular/core';
import { Mesa, MesaService } from '../../servicios/mesa-service';

@Component({
  selector: 'app-disponibilidad-mesas',
  imports: [],
  templateUrl: './disponibilidad-mesas.html',
  styleUrl: './disponibilidad-mesas.css',
})
export class DisponibilidadMesas {
  @Input() mesas: Mesa[] = []
}
