import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { InspectoresComponent } from './modulos/administracion/inspectores/inspectores.component';
import { JuntasComponent } from './modulos/administracion/juntas/juntas.component';
import { SoldadoresComponent } from './modulos/administracion/soldadores/soldadores.component';





@NgModule({
  declarations: [
    AppComponent,
    InspectoresComponent,
    JuntasComponent,
    SoldadoresComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
