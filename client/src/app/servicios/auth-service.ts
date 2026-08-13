import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface Sesion {
  id: string,
  email: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiURL = "/api/auth"
  private http = inject(HttpClient)

  public cargarSesion(): Observable<Sesion> {
    return this.http.get<Sesion>(`${this.apiURL}/@me`, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  public login(email: string, password: string): Observable<Sesion> {
    return this.http.post<Sesion>(`${this.apiURL}/login`, { email, password }, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  public register(username: string, email: string, password: string): Observable<Sesion> {
    return this.http.post<Sesion>(`${this.apiURL}/register`, { username, email, password }, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  public logout(): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/logout`, null, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.status === 0
      ? 'No se pudo conectar con la API.'
      : `Error ${error.status}: ${error.message}`;
    return throwError(() => new Error(message));
  }
}
