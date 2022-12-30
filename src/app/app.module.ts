import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { BlockUIModule } from 'ng-block-ui';
import { CommonModule } from '@angular/common';
import { AuthInterceptorService } from './services/AuthInterceptorService';
import { SharedModule } from './modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    BlockUIModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { 
      provide: 'LOCALSTORAGE', 
      useValue: window.localStorage 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
