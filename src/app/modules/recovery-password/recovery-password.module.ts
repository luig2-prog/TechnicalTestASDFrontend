import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryPasswordRoutingModule } from './recovery-password-routing.module';
import { PasswordRecoveryComponent } from './component/password-recovery/password-recovery.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PasswordRecoveryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RecoveryPasswordRoutingModule
  ]
})
export class RecoveryPasswordModule { }
