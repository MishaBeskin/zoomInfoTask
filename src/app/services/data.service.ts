import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Question } from '../models/queation.model';

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
  fetchQuestions(): Observable<Question> {
    return this.http
      .get<any[]>(
        environment.questionsUrl
      ).pipe(
        map(resQuestionData => {



          const { correct_answer, incorrect_answers, question } = resQuestionData['results'][0]
          const result: Question = {
            incorrect_answers: this.getIncorrectAnswer(incorrect_answers),
            question: atob(question),
            correct_answer: atob(correct_answer)
          };
          return result;
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
