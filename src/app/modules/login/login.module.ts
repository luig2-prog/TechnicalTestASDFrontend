import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }