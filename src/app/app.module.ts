import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RadialProgressModule} from "./modules/radial-progress/radial-progress.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RadialProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
