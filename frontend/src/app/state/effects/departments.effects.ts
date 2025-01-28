import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { addEmployeeFailure, loadDepartmentsSuccess } from '../actions/app.actions';
import { AppService } from '../../app.service';
import { AppState } from '../app.state';

@Injectable()
export class DepartmentEffects {
    constructor(private actions$: Actions, private appService: AppService, private store: Store<AppState>) { }

    loadDepartments$ = createEffect(() =>
        this.actions$.pipe(
            ofType('[Departments API] Load Departments'),
            mergeMap(() => this.appService.getDepartments().pipe(
                map((departments) => {
                    return loadDepartmentsSuccess({ departments });
                }),
                catchError((error) => {
                    console.error('Error loading departments: ', error);
                    return of(addEmployeeFailure({ error }));
                })
            ))
        )
    );
}
