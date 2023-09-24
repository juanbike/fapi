import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Junta } from './model/products';
import {  map, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JuntasService {
  private apiUrl="http://localhost:3500/api/juntas";

  constructor(private http:  HttpClient) { }
  allJuntas: Junta[] = [];


  //Create Junta
  onJuntaCreate(  juntas:{ tipo_extremos: string, tipo_material: string, material: string}): Observable<Junta> { {
     return this.http.post<Junta>(this.apiUrl, juntas);
    }
  }


 fetchJuntas(): Observable<Junta[]> {
    return  this.http.get<Junta[]>(this.apiUrl).pipe(
      catchError( (error: HttpErrorResponse) => {
        console.log('Error al obtener juntas', error);
        // Puedes realizar acciones adicionales aquí, como mostrar un mensaje de error al usuario
        // Devolvemos un observable vacío en caso de error para que el flujo continúe sin problemas
        return of([] as Junta[]);
      })
    );

 }


  //Delete junta by id
  onDeleteJunta(id: string): Observable<Junta> {
    return this.http.delete<Junta>(`${this.apiUrl}/${id}`);
  }

  //Update Junta
  onJuntaUpdate(junta: Junta): Observable<Junta> {
    return this.http.put<Junta>(`${this.apiUrl}/${junta.id}`, junta);
  }

  //Delete all juntas
  onDeleteAllJuntas(): Observable<Junta> {
    return this.http.delete<Junta>(`${this.apiUrl}`);
  }


}
