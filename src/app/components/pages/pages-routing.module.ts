import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { p404Component } from './404/404.component';
import { p500Component } from './500/500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LockedComponent } from './locked/locked.component';
import { ForgetPasswordComponent } from './forget-password/forget.password.component';
import { ActivatedComponent } from './activated/activated.component';
import { RecoverPasswordComponent } from './recover-password/recover.password.component';

const routes: Routes = [
    {
      path: '404',
      component: p404Component,
      data: {
        title: '404'
      }
    },
    {
      path: '500',
      component: p500Component,
        data: {
          title: '500'
      }
    },
    {
      path: 'login',
      component: LoginComponent,
        data: {
          title: 'Login'
        }
    },
    {
      path: 'sing-up',
      component: RegisterComponent,
        data: {
          title: 'Registrar-se'
        }
    },
    {
      path: 'locked',
      component: LockedComponent,
        data: {
          title: 'Bloqueado'
        }
    },
    {
        path: 'activated/:token',
        component: ActivatedComponent,
          data: {
            title: 'Ativação de conta'
          }
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent,
          data: {
            title: 'Recuperação de senha'
          }
    },
    {
        path: 'recover/:token',
        component: RecoverPasswordComponent,
          data: {
            title: 'Recuperação de senha'
          }
    },
    {
      path: '**',
      redirectTo: '/404'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
