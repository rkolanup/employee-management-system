import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { loadDepartmentsSuccess } from '../actions/app.actions';
import { AppService } from '../../app.service';

@Injectable()
export class DepartmentEffects {

}
