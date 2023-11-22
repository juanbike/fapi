import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Junta } from '../../model/products';

import { NgForm } from '@angular/forms';
import { JuntasService } from '../../juntas.service';

@Component({
  selector: 'app-agregar-modal',
  templateUrl: './agregar-modal.component.html',
  styleUrls: ['./agregar-modal.component.css'],

})
export class AgregarModalComponent {
  constructor(private http: HttpClient, private juntasService: JuntasService) {}
  title = 'AngularHttpRequest';
  private apiurl="http://localhost:3500/api/juntas/";

  //datosTabla: Junta[] ;
  allJuntas: Junta[] = [];
  showMessage: boolean = false; //Funcion Para mostrar mensajes al usuario
  messageText: string = ''; //Mensaje a mostrar
  isLoading: boolean = false; //Controlar carga de datos
  @Input() visualizarModal: boolean = false; //muestra la ventana modal
  @Input() mostrar = true;


  //Accedemos a las propiedades del formulario
  @ViewChild( 'juntasForm' ) form: NgForm;
  //cambiamos la propiedad del boton de submit
  editMode: boolean = false;
  @ViewChild('myModal') myModal: ElementRef;



  cerrarModal() {
    this.mostrar = false;
    alert('cerrar');
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
