import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { forkJoin, Observable, Subject } from 'rxjs';
import { concatMap, mergeMap } from 'rxjs/operators';
import { Question } from 'src/app/models/queation.model';
import { DataService } from 'src/app/services/data.service';
import * as QAcations from '../actions/question.actions';


@Injectable()
export class QuestionEffects {

  constructor(
    private actions$: Actions,
    private qustServ: DataService,
  ) { }

  //in this effect I used mergeMap and ForkJoin to get all 10 Questions.
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(QAcations.getAll),
    mergeMap(action => {
      const obsList: Observable<any>[] = this.requestsArray();

      const sub: Subject<Action> = new Subject<Action>();
      forkJoin(obsList).subscribe((arr: Question[]) => {
        sub.next(QAcations.retrievedAll({ questions: arr }));
        sub.complete();
      });
      return sub;
    })

  ))

  requestsArray(): Observable<Question>[] {
    const qArray = [];
    for (let i = 0; i < 10; i++) {
      qArray.push(this.qustServ.fetchQuestions());

    }
    return qArray;
  }


}

