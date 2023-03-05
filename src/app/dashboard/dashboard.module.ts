import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFormComponent } from './table-form/table-form.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [DashboardPageComponent, DashboardComponent, TableComponent, TableFormComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzTableModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzRateModule,
    NzIconModule
    
    ],
  exports: [
    DashboardComponent,
    DashboardComponent
  ]
})
export class DashboardModule {}
