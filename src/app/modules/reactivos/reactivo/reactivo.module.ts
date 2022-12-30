import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { BlockUIModule } from 'ng-block-ui';
import { ReactivoRoutingModule } from './reactivo-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactivoRoutingModule,
    BlockUIModule.forRoot()
  ]
})
export class ReactivoModule { }
