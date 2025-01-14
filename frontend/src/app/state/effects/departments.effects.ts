import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { loadDepartmentsSuccess } from '../actions/app.actions';
import { AppState } from '../app.state';
import { AppService } from '../../app.service';

@Injectable()
export class DepartmentEffects {
    constructor(private actions$: Actions, private store: Store<AppState>, private appService: AppService) { }

    loadDepartments$ = createEffect(() =>
        this.actions$.pipe(
            ofType('[Departments API] Load Departments'),// Action to trigger this effect
            mergeMap(() =>
                this.appService.getDepartments().pipe( // API call to fetch departments
                    map((departments) => loadDepartmentsSuccess({ departments })), // Dispatch success action with payload
                    catchError((error) =>
                        of({ type: '[Departments API] Load Departments Failure', error })
                    )
                )
            )
        )
    );
}
