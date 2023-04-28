import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'employee-list',
    loadChildren: () => import('./employee-list/employee-list.module').then(m=>m.EmployeeListModule)
  },
  {
    path: 'department-list',
    loadChildren: () => import('./department-list/department-list.module').then(m => m.DepartmentListModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
