import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  map } from 'rxjs';
import { Junta } from './model/products';

import { NgForm } from '@angular/forms';
//import { JuntasService } from './juntas.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{



  title = 'AngularHttpRequest';
  private apiurl="http://localhost:3500/api/juntas/";
  allJuntas: Junta[] = [];
  //datosTabla: Junta[] ;

  showMessage: boolean = false;
  messageText: string = '';

  //Accedemos a las propiedades del formulario
  @ViewChild( 'juntasForm' ) form: NgForm;
  //cambiamos la propiedad del boton de submit
  editMode: boolean = false;

  constructor(private http: HttpClient){}


  //httpClient: HttpClient;

  //constructor(private juntasService: JuntasService, httpClient: HttpClient) {}

  /*
  private fethcjuntas(){
    this.juntasService.obtenerDatosTabla().subscribe((datos) => {
      this.datosTabla = datos;
      console.log(this.datosTabla);
      this.allJuntas = datos
    });
  }
*/






  ngOnInit(): void {
      this.fetchJuntas();
  }


  onJuntas(){
    this.fetchJuntas();
  }




  onJuntaCreate(juntas:{ tipo_extremos: string, tipo_material: string, material: string}){
    console.log(juntas);
    this.http.post<Junta>(this.apiurl, juntas).subscribe( (response)  =>{
      console.log(response);
    }
      )
    /*
    const headers = new HttpHeaders({ 'myHeaders': "juanbike"})
    this.httpClient.post(this.apiurl, juntas).subscribe(
      (response) =>{
        console.log(response)
      }
    );
    */
  }


  private fetchJuntas(){
    this.http.get(this.apiurl).pipe(
      map((response) => {
        return response as Junta[];
      })

    )
    .subscribe((response) => {
      console.log(response);
      this.allJuntas = response;
      return response;
    })

  }

  /*
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

  */


  onDeleteJunta(id: string):void{

    this.http.delete<void>(`${this.apiurl}${id}`).subscribe(
      () => {
        // Operación exitosa
        this.showMessageWithTimeout('Junta eliminada con éxito', 3000);

      },
      (error: HttpErrorResponse) =>{
        console.log('Error al eliminar la junta', error);
        // Muestro mensaje de error
        this.showMessageWithTimeout('Error al eliminar la junta', 3000);

      }
    );
  }



  onDeleteAllJuntas():void{
    this.http.delete<void>(`${this.apiurl}`).subscribe(
      () =>{
        // Operación exitosa
        this.showMessageWithTimeout('Juntas eliminadas con exito', 3000);
      },
      (error: HttpErrorResponse) =>{
        console.log('Error al eliminar las juntas', error);
        // Muestro mensaje de error
        this.showMessageWithTimeout('Error al eliminar las juntas', 3000);
      }
    )
  }


  onEditClicked(id: string){
    //console.log(id);
    let junta = this.allJuntas.find(
      (p) => {
        return p.id === id
      }
    )
    console.log(junta);

    //Llenamos el formulario con los datos de la junta seleccionada
    this.form.setValue({
      tipo_extremos: junta.tipo_extremos,
      tipo_material: junta.tipo_material,
      material: junta.material
    })

    //Cambiamos el modo de edicion
    this.editMode = true;
  }


  //utilities

  showMessageWithTimeout(message: string, timeout: number): void {
    this.showMessage = true;
    this.messageText = message;

    setTimeout(() => {
      this.showMessage = false;
      this.messageText = '';
    }, timeout);
  }





  /*

  onDeleteJunta(id: string): void {
    const url = `${this.apiurl}/${id}`;

    this.httpClient.delete(url).subscribe(
      () => {
        console.log(`Junta con ID ${id} eliminada con éxito.`);
        // Realizar cualquier acción adicional después de eliminar, como actualizar la lista de juntas.
      },
      (error) => {
        console.error(`Error al eliminar la junta con ID ${id}: ${error}`);
        // Manejar errores aquí, por ejemplo, mostrar un mensaje de error al usuario.
      }
    );
  }
*/










  }










