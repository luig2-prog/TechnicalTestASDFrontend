import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { AddEditMuestraComponent } from './component/add-edit-muestra/add-edit-muestra.component';
import { MuestraRoutingModule } from './muestra-routing.module';
import { MuestrasComponent } from './component/muestras/muestras.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    AddEditMuestraComponent,
    MuestrasComponent
  ],
  imports: [
    CommonModule,
    MuestraRoutingModule,
    MaterialModule,
    BlockUIModule.forRoot(),
  ], 
  exports: [
  ]
})
export class MuestraModule { }