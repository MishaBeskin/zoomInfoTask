import { map } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';

import { QuestionActionTypes, GetQuestion } from '../actions/question.actions';
import { DataService } from 'src/app/services/data.service';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private qustServ: DataService,
    private router: Router,
  ) { }

  @Effect({ dispatch: false })
  GetQuestion: Observable<any> = this.actions
    .ofType(QuestionActionTypes.GET_QUESTION)
    .map((action: GetQuestion) => action)
    .switchMap(payload => {
      return this.qustServ.fetchQuestions();
    });

}
