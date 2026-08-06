import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Reserva {
  id: string,
  cliente: string,
  correo: string,
  mesa: string,
  fecha: string,
  hora: string
}

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private readonly apiURL = "http://localhost:5000/api/reservas"
  private http = inject(HttpClient)

  public getAll(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiURL}/`, { withCredentials: true }).pipe(catchError(this.handleError))
  } 

  public registrarReserva(mesaID: string, fecha: string, hora: string): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiURL}/`, { mesaID, fecha, hora }, { withCredentials: true }).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.status === 0
      ? 'No se pudo conectar con la API.'
      : `Error ${error.status}: ${error.message}`;
    return throwError(() => new Error(message));
  }
}
