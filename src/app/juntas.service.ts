import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Junta } from './model/products';

@Injectable({
  providedIn: 'root'
})
export class JuntasService {
  private apiUrl="http://localhost:3500/api/juntas";

  constructor(private httpClient:  HttpClient) { }
  /*
    public getPlayers(): Observable<Junta[]> {
        return this.httpClient.get('http://localhost:3500/api/junta');
    }
*/


    obtenerDatosTabla(): Observable<Junta[]> {
      return this.httpClient.get<Junta[]>(`${this.apiUrl}`);
    }

}
