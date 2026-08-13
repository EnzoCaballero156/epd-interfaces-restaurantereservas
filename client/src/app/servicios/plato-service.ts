import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Plato {
  id: string,
  nombre: string,
  precio: number,
  rutaImagen: string
}

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  private readonly apiURL = '/api/platos'
  private http = inject(HttpClient)

  public getAll(): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiURL}/`, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  public agregarPlato(data: FormData): Observable<Plato> {
    return this.http.post<Plato>(`${this.apiURL}/`, data, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  public eliminarPlatoPorID(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  public getImagePath(route: string): string {
    return route;
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.status === 0
      ? 'No se pudo conectar con la API.'
      : `Error ${error.status}: ${error.message}`;
    return throwError(() => new Error(message));
  }
}
