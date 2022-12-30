import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './componets/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    BlockUIModule.forRoot()
  ]
})
export class HomeModule { }
