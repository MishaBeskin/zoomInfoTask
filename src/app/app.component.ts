import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subject, Subscription } from 'rxjs';
import { map, repeat, takeWhile } from 'rxjs/operators';
import { Question } from './models/queation.model';
import { DataService } from './services/data.service';
import * as QAcations from './store/actions/question.actions';
import { getCurrentIndex, getQuestions, getTriesLef } from './store/question.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zoomInfoTask';
  //current active question
  questionN: Question = {
    "correct_answer": "",
    "incorrect_answers": [],
    "question": ""
  };
  private questionSub: Subscription;
  private questionWrongSub: Subscription;
  timeIntervalSeconds = 20;
  private leftSeconds = 20;
  questions: Question[] = [];
  numberOfAttempts = 3;

  constructor(private store: Store) { }

  //on init I fetching the questions using action and effects
  ngOnInit() {
    this.store.dispatch(QAcations.getAll());
    this.store.select(getQuestions).subscribe((questions: Question[]) => {
      this.questions = questions;
      if (questions) {
        this.questionN = questions[0];
      }
      console.log(this.questions);
    });
    //setting interval for 20 sec to get next question
    setInterval(() => { this.nextQuestion() }, this.timeIntervalSeconds * 1000);
  }


  nextQuestion() {
    if (this.questionSub)
      this.questionSub.unsubscribe();
    //using action to get next question by getting current sate index
    this.store.dispatch(QAcations.next());
    this.questionSub = this.store.select(getCurrentIndex).subscribe((index: number) => {
      //if we get index = 9 it means we have finished all 10 questions
      if (index > 9) {
        return
      }
      //updating actual question
      this.questionN = this.questions[index];
      console.log(this.questionN);
    });
  }

  isCorrectAns(ans) {
    if (this.questionWrongSub)
      this.questionWrongSub.unsubscribe();
    //if answer correct going to the next question using action correct
    if (ans === this.questionN.correct_answer) {
      this.store.dispatch(QAcations.correct());
      alert("Grate!!!");
      this.nextQuestion();
    } else {
      //if wrong answer using action wrong and updating tries left
      this.store.dispatch(QAcations.wrong());
      this.questionWrongSub = this.store.select(getTriesLef).subscribe((num: number) => {
        alert("Wrong Answer,Please try again")
        if (num === 0) {
          alert("Correct answer is:" + this.questionN.correct_answer)
          this.nextQuestion();
        }
      });

    }
  }

  //timer used for the clock
  countDown$ = interval(1000).pipe(
    map(value => this.leftSeconds - value),
    takeWhile(x => x >= 1),
    repeat()
  );

}
