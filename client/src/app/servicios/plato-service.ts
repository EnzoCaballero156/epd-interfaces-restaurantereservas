import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Plato {
  id: number,
  nombre: string,
  precio: number,
  rutaImagen: string
}

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  private readonly apiURL = 'http://localhost:5000/api/platos/'

  private http = inject(HttpClient)

  public getAll(): Observable<Plato[]> {
      // let data = localStorage.getItem('platos')
      // return data ? JSON.parse(data) : []
      return this.http.get<Plato[]>(this.apiURL).pipe(catchError(this.handleError))
    }

  // devolvia Plato
  public crearPlato(nombre: string, precio: number): void {
    // let newPlato: Plato = { nombre, precio, rutaImagen: "../assets/plato.png" }
    // return newPlato
  }

  public addPlato(nombre: string, precio: number): Observable<Plato> {
    // let data = this.getAll()
    // data.push(newPlato)
    // localStorage.setItem('platos', JSON.stringify(data))
    console.log(nombre)
    return this.http.post<Plato>(this.apiURL, { nombre, precio, rutaImagen: "../assets/img.png" }).pipe(catchError(this.handleError))
  }

  public eliminarPlato(nombre: string): void {
    // let data = this.getAll()
    // let newData = data.filter(item => item.nombre !== nombre)
    // localStorage.setItem('platos', JSON.stringify(newData))
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.status === 0
      ? 'No se pudo conectar con la API.'
      : `Error ${error.status}: ${error.message}`;
    return throwError(() => new Error(message));
  }
}
