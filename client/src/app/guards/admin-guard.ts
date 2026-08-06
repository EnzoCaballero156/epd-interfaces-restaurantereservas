import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth-service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.cargarSesion().pipe(map(sesion => {
    if (sesion.email !== "admin@admin.xyz") {
      router.navigate(['/menu'])
      return false
    }
    return true
  }))
};
