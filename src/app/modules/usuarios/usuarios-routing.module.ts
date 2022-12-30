import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/componet/menu/menu.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';


const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', component: UsuariosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
