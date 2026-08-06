import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Mesa {
  id: string,
  nombre: string,
  capacidad: number,
  disponible: boolean
}

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private readonly apiURL = "http://localhost:5000/api/mesas"
  private http = inject(HttpClient)

  public getAll(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.apiURL}/`, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  public getAllByDisponible(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.apiURL}/disponible`, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  public agregarMesa(nombre: string, capacidad: number): Observable<Mesa> {
    return this.http.post<Mesa>(`${this.apiURL}/`, { nombre, capacidad }, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  public actualizarMesa(id: string): Observable<Mesa> {
    return this.http.patch<Mesa>(`${this.apiURL}/${id}`, null, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.status === 0
      ? 'No se pudo conectar con la API.'
      : `Error ${error.status}: ${error.message}`;
    return throwError(() => new Error(message));
  }
}
