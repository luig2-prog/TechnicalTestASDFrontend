import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { AddEditMuestraComponent } from './component/add-edit-muestra/add-edit-fixed-asset.component';
import { MuestraRoutingModule } from './fixed-asset-routing.module';
import { FixedAssetComponent } from './component/fixed-asset/fixed-asset.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    AddEditMuestraComponent,
    FixedAssetComponent
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
export class FixedAssetModule { }