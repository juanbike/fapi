import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {  map } from 'rxjs';
import { Junta } from './model/products';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularHttpRequest';
  private apiurl="http://localhost:3500/api/juntas";
  allJuntas: Junta[];


  constructor( private httpClient: HttpClient){

  }

  ngOnInit(): void {
      this.fethcjuntas();
  }

  onJuntas(){
    this.fethcjuntas();
  }



  onJuntaCreate(juntas:{ tipo_extremos: string, tipo_material: string, material: string}){
    console.log(juntas);
    const headers = new HttpHeaders({ 'myHeaders': "juanbike"})
    this.httpClient.post(this.apiurl, juntas).subscribe(
      (response) =>{
        console.log(response)
      }
    );
  }

  private fethcjuntas(){
    this.httpClient.get<{[key:string]: Junta} >(this.apiurl).pipe(
      map(
        (response: { [key:string] : Junta}) =>{
          const juntas = [];
          for( const key in response){
            if( response.hasOwnProperty(key))
            {
              const junta: Junta = {
                ...response[key], // Copia otros datos de la respuesta
                id: key, // Agrega el ID a la propiedad "id"
              }; //junta
              juntas.push(junta);
              console.log(junta.id, junta.material)
            }
            /*
            {
              juntas.push({...response[key], id:key});
            }
            */

          }//endfor
          return juntas
        } //response
      ) //map
    ).subscribe(
      (juntas) =>{
        console.log(juntas);
        this.allJuntas = juntas
      }
    )
  }

  onDeleteJunta(id: string){
    //console.log(+id+1);
    //const idt = +id + 1
    //console.log('idt:'+idt);
    this.httpClient.delete(`${this.apiurl}/${id}.json`).subscribe()
  }

  }










