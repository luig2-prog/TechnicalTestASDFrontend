import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActiveGuard } from './guards/auth-active.guard';

const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./../app/modules/login/login.module').then(m => m.LoginModule),
      canActivate: []
    },
    {
      path: 'user/set-passowrd',
      loadChildren: () => import('./../app/modules/recovery-password/recovery-password.module').then(m => m.RecoveryPasswordModule),
      canActivate: [AuthActiveGuard]
    },
    {
      path: 'user/reset-password/:id',
      loadChildren: () => import('./../app/modules/recovery-password/recovery-password.module').then(m => m.RecoveryPasswordModule),
      canActivate: []
    },
    { 
      path: 'home',
      loadChildren: () => import('./../app/modules/home/home.module').then(m => m.HomeModule),
      canActivate: [AuthActiveGuard]
    },
    { 
      path: 'usuarios',
      loadChildren: () => import('./../app/modules/usuarios/usuarios.module').then(m => m.UsuarioModule),
      canActivate: [AuthActiveGuard]
    },
    { 
      path: 'maestras',
      loadChildren: () => import('./../app/modules/maestras/maestra.module').then(m => m.MaestraModule),
      canActivate: [AuthActiveGuard]
    },
    { 
      path: 'reactivos',
      loadChildren: () => import('./../app/modules/reactivos/reactivo/reactivo.module').then(m => m.ReactivoModule),
      canActivate: [AuthActiveGuard]
    },
    { 
      path: 'muestras',
      loadChildren: () => import('./../app/modules/muestras/muestra.module').then(m => m.MuestraModule),
      canActivate: [AuthActiveGuard]
    },
    { 
      path: 'cliente',
      loadChildren: () => import('./../app/modules/clientes/cliente.module').then(m => m.ClienteModule),
      canActivate: [AuthActiveGuard]
    },
    {
      path: '**',
      redirectTo: 'login',
      pathMatch: 'full'
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
