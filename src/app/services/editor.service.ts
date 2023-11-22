import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Junta } from '../model/products';
import {  map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private apiUrl="http://localhost:3500/api/juntas";

  constructor(private http:  HttpClient) { }
  allJuntas: Junta[] = [];

  //Create Junta
  onJuntaCreate(  juntas:{ nominal: string, nominal1: string, lineaOSistema: string, especificacion: string, schedule: string,
    tipo_extremos: string, tipo_material: string, material: string, diam_inch_contabilizadas: string,
    factor_pulgadas_diametrales: string, pulgadas_diametrales: string, proyectID: string, usuarioID: string}): Observable<Junta> { {
     return this.http.post<Junta>(this.apiUrl, juntas);
    }
  }


}
