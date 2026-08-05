import { Routes } from '@angular/router';

import { Login } from './paginas/login/login';
import { Register } from './paginas/register/register';
import { Menu } from './paginas/menu/menu';
import { Reservar } from './paginas/reservar/reservar';
import { Mesas } from './paginas/mesas/mesas';
import { Reservas } from './paginas/reservas/reservas';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { AgregarPlato } from './paginas/agregar-plato/agregar-plato';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'menu', component: Menu, canActivate: [authGuard] },
    { path: 'reservar', component: Reservar, canActivate: [authGuard] },
    { path: 'mesas', component: Mesas, canActivate: [authGuard, adminGuard] },
    { path: 'reservas', component: Reservas, canActivate: [authGuard, adminGuard] },
    {path: 'agregar-plato', component: AgregarPlato }
];