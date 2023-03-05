import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '../_core/guards/dashboard.guard';

const routes: Routes = [
  {path: '',
  component:DashboardComponent,
  canActivate:[DashboardGuard],
    children: [
    {path:'',pathMatch:'full',redirectTo:'dashboard-page'},
    {path:'dashboard-page',component:DashboardPageComponent}

  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
