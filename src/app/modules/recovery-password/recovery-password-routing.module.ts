import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordRecoveryComponent } from './component/password-recovery/password-recovery.component';

const routes: Routes = [
  { path: '', component: PasswordRecoveryComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryPasswordRoutingModule { }
