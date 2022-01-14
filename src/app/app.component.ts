import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subject, Subscription } from 'rxjs';
import { map, repeat, takeWhile } from 'rxjs/operators';
import { Question } from './models/queation.model';
import { DataService } from './services/data.service';
import * as QAcations from './store/actions/question.actions';
import { getCurrentQuestion } from './store/question.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zoomInfoTask';
  questionN: Question = {
    "correct_answer": "",
    "incorrect_answers": [],
    "question": ""
  };
  private questionSub: Subscription;
  timeIntervalSeconds = 20;
  private leftSeconds = 20;
  questions: Question[] = [];
  numberOfAttempts = 3;
  //when component is constructed trying to get data if is there something
  constructor(private dataService: DataService, private store: Store) { }

  ngOnInit() {
    this.store.dispatch(QAcations.getAll());
    this.store.select(getCurrentQuestion).subscribe((questions: Question[]) => {
      this.questions = questions;
      console.log(this.questions);
      setInterval(() => { this.nextQuestion() }, this.timeIntervalSeconds * 1000);
    });
  }


  nextQuestion() {
    this.store.dispatch(QAcations.next());
  }

  isCorrectAns(ans) {
    if (ans === this.questionN.correct_answer) {
      this.store.dispatch(QAcations.correct());
      alert("Grate!!!");
      this.nextQuestion();
    } else {
      this.store.dispatch(QAcations.wrong());
      this.numberOfAttempts = this.numberOfAttempts - 1;
      alert("Wrong Answer,Please try again")
      if (this.numberOfAttempts === 0) {
        alert("Correct answer is:" + this.questionN.correct_answer)
        this.nextQuestion();
      }
    }
  }

  countDown$ = interval(1000).pipe(
    map(value => this.leftSeconds - value),
    takeWhile(x => x >= 1),
    repeat()
  );

}
