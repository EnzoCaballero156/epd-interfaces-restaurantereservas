import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  @Input() titulo: string = '';
  @Input() ruta: string = '';

  @Input() titulo2: string = '';
  @Input() ruta2: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  public cerrarSesion(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/'])
    });
  }
}