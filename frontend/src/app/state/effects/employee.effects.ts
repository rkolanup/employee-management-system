import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppService } from '../../app.service';
import { addEmployeeFailure, addEmployeeSuccess, loadEmployeesSuccess } from '../actions/app.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class EmployeeEffects {
    constructor(private actions$: Actions, private appService: AppService, private store: Store<AppState>) { }

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

    // addEmployee$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType('[Employees API] Add Employee'), // Match the action
    //         mergeMap((action: any) =>
    //             this.appService.addEmployee(action.employee).pipe(
    //                 map((employee) =>
    //                     addEmployeeSuccess({ employee }) // Dispatch success action with added employee
    //                 ),
    //                 catchError((error) =>
    //                     of(addEmployeeFailure({ error })) // Dispatch failure action with error
    //                 )
    //             )
    //         )
    //     )
    // );
}
