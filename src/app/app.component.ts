import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  map } from 'rxjs';
import { Junta } from './model/products';
import { v4 as uuidv4 } from 'uuid';
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










