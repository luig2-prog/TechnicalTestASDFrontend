import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { MaestrasTableComponent } from './component/maestras-table/maestras-table.component';
import { MaestraRoutingModule } from './maestra-routing.module';
import { AddEditMaestraComponent } from './component/add-edit-maestra/add-edit-maestra.component';

@NgModule({
  declarations: [
      MaestrasTableComponent,
      AddEditMaestraComponent
  ],
  imports: [
    CommonModule,
    MaestraRoutingModule,
    MaterialModule,
  ], 
  exports: [
  ]
})
export class MaestraModule { }