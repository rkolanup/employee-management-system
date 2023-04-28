import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { MatTableModule } from '@angular/material/table';
import {  MatPaginatorModule } from '@angular/material/paginator';
const routes: Routes = [
  {
    path:'',
    component: EmployeeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),    
    MatTableModule,
    MatPaginatorModule,],
  exports: [RouterModule]
})
export class EmployeeListModule { }