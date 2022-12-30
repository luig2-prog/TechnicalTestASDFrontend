import { NgModule } from '@angular/core';
import { ClientesTableComponent } from './componet/clientes-table/clientes-table.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { BlockUIModule } from 'ng-block-ui';
import { AddEditClientComponent } from './componet/add-edit-client/add-edit-client.component';
import { ClienteRoutingModule } from './cliente-routing.module';

@NgModule({
  declarations: [
    ClientesTableComponent,
    AddEditClientComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    BlockUIModule.forRoot(),
  ], 
  exports: [
  ]
})
export class ClienteModule { }