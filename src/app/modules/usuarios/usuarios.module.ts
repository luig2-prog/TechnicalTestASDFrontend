import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MaterialModule } from '../material.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    UsuariosComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    UsuariosRoutingModule,
    SharedModule
  ]
})
export class UsuarioModule { }