import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Junta } from './model/products';

import { NgForm } from '@angular/forms';
import { JuntasService } from './juntas.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private http: HttpClient, private juntasService: JuntasService) {}
  title = 'AngularHttpRequest';
  private apiurl="http://localhost:3500/api/juntas/";

  //datosTabla: Junta[] ;
  allJuntas: Junta[] = [];
  showMessage: boolean = false; //Funcion Para mostrar mensajes al usuario
  messageText: string = ''; //Mensaje a mostrar
  isLoading: boolean = false; //Controlar carga de datos

  //Accedemos a las propiedades del formulario
  @ViewChild( 'juntasForm' ) form: NgForm;
  //cambiamos la propiedad del boton de submit
  editMode: boolean = false;

  ngOnInit(): void {
      this.fetchJuntas();
  }


  onJuntas(){
    this.fetchJuntas();
  }





  onJuntaCreate(juntas:{ nominal: string, nominal1: string, lineaOSistema: string, especificacion: string, schedule: string,
    tipo_extremos: string, tipo_material: string, material: string, diam_inch_contabilizadas: string,
    factor_pulgadas_diametrales: string, pulgadas_diametrales: string, proyectID: string, usuarioID: string}): void{
    this.juntasService.onJuntaCreate(juntas).subscribe(
      (response: Junta) => {
        this.allJuntas.push(response);
        this.showMessageWithTimeout('Junta creada con exito', 3000);
      },
      (error: HttpErrorResponse) => {
        console.log('Error al crear la junta', error);
        // Muestro mensaje de error
        this.showMessageWithTimeout('Error al crear la junta', 3000);
      }
    );

  }




  private fetchJuntas(){
    this.isLoading = true; // Mostrar el mensaje de carga
    this.juntasService.fetchJuntas().subscribe(

      (response: Junta[]) => {
        this.allJuntas = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false; // Ocultar el mensaje de carga cuando se complete la solicitud
        alert(error.message);
      })

  }




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
      nominal: junta.nominal,
      nominal1: junta.nominal1,
      lineaOSistema: junta.lineaOSistema,
      especificacion: junta.especificacion,
      schedule: junta.schedule,
      tipo_extremos: junta.tipo_extremos,
      tipo_material: junta.tipo_material,
      material: junta.material,
      diam_inch_contabilizadas: junta.diam_inch_contabilizadas,
      factor_pulgadas_diametrales: junta.factor_pulgadas_diametrales,
      pulgadas_diametrales: junta.pulgadas_diametrales,
      proyectID: junta.proyectID,
      usuarioID: junta.usuarioID

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


  



  }










