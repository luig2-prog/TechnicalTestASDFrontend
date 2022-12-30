import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/componet/menu/menu.component';
import { HomeComponent } from './componets/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
