import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Guards
import { AuthGuard } from './guards/auth.guard';

//Layouts
import { FullLayoutComponent } from './components/layouts/full-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Painel de Gerenciamento'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './components/dashboard/dashboard.module#DashboardModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
