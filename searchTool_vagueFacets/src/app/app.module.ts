import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterTestingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  entryComponents: [
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
