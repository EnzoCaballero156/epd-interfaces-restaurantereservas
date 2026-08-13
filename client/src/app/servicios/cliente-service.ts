import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Cliente {
  id: string,
  username: string,
  email: string
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly apiURL = "/api/clientes"
  private http = inject(HttpClient)

  public getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiURL}/`, { withCredentials: true }).pipe(catchError(this.handleError))
  }
  
  private handleError(error: HttpErrorResponse) {
    const message = error.status === 0
      ? 'No se pudo conectar con la API.'
      : `Error ${error.status}: ${error.message}`;
    return throwError(() => new Error(message));
  }
}
