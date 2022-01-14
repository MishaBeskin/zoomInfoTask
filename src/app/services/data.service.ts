import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  // crating question BehaviorSubject to listen for a changes of them.
  private _question = new BehaviorSubject<{}>({});



  //getting question
  get question() {
    return this._question.asObservable();
  }


  constructor(private http: HttpClient) { }

  //getting the next question.
  fetchQuestions() {
    return this.http
      .get<any[]>(
        environment.questionsUrl
      ).pipe(
        map(resQuestionData => {

          const question = {};
          const questionEncode = resQuestionData['results'][0]
          let value;
          for (let key in questionEncode) {
            if (key === "incorrect_answers") {
              value = this.getIncorrectAnswer(questionEncode[key]);
            } else {
              value = atob(questionEncode[key]);
            }
            question[key] = value
            // Use `key` and `value`
          }
          return question;
        }),
        tap(question => {
          this._question.next(question);
          console.log(question);
        })
      );
  }


  getIncorrectAnswer(wrongAnswer) {
    const decodeWrongAnswer = []
    wrongAnswer.forEach(element => {
      decodeWrongAnswer.push(atob(element));
    });
    return decodeWrongAnswer;
  }
}
