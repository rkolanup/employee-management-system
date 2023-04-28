import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { DepartmentListComponent } from './department-list.component';

const routes: Routes = [
  {
    path: '', 
    component: DepartmentListComponent
  },
];
@NgModule({
  declarations: [
    DepartmentListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class DepartmentListModule { }
