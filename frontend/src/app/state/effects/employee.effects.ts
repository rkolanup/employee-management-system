import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppService } from '../../app.service';
import { addEmployeeFailure, addEmployeeSuccess, loadEmployeesSuccess } from '../actions/app.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as EmployeeActions from '../actions/app.actions';
import { Employees, Department } from 'src/app/models/employee-list.model';

@Injectable()
export class EmployeeEffects {
    constructor(private actions$: Actions, private appService: AppService, private store: Store<AppState>) { }
    department$: Observable<Department> | undefined;
    department: Department | undefined;

    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType('[Employees API] Load Employees'),
            mergeMap(() =>
                this.appService.getEmployees().pipe(
                    map((employees) => loadEmployeesSuccess({ employees })),
                    catchError((error) =>
                        of({ type: '[Employees API] Load Employees Failure', error })
                    )
                )
            )
        )
    );

    addEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.addEmployee),
            mergeMap(({ employee }) =>
                this.appService.addEmployee(employee).pipe(
                    switchMap((newEmployee: any) =>
                        this.appService.getDepartmentsById(newEmployee.department.id).pipe(
                            map((department) => {
                                const updatedEmployee = {
                                    ...newEmployee,
                                    department: { id: department.id, name: department.name }
                                };
                                return EmployeeActions.addEmployeeSuccess({ employee: updatedEmployee });
                            })
                        )
                    ),
                    catchError((error) =>
                        of(EmployeeActions.addEmployeeFailure({ error }))
                    )
                )
            )
        )
    );

    editEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.editEmployee),
            mergeMap(({ id, employee }) =>
                this.appService.updateEmployee(id, employee).pipe(
                    tap((employee) => {
                        console.log('Employee: ', employee);
                    }),
                    map((updatedEmployee) => {

                        return EmployeeActions.editEmployeeSuccess({ employee: updatedEmployee });
                    }),
                    catchError((error) =>
                        of(EmployeeActions.editEmployeeFailure({ error }))
                    )
                )
            )
        )
    );

    // editEmployee$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(EmployeeActions.editEmployee),
    //         mergeMap(({ id, employee }) =>
    //             this.appService.updateEmployee(id, employee).pipe(
    //                 map((updatedEmployee) => {
    //                     console.log('Updated Employee: ', updatedEmployee);
    //                     return EmployeeActions.editEmployeeSuccess({ employee: updatedEmployee });
    //                 }),
    //                 catchError((error) =>
    //                     of(EmployeeActions.editEmployeeFailure({ error }))
    //                 )
    //             )
    //         )
    //     )
    // );


}
