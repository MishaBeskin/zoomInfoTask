import { Component, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { map, repeat, takeWhile } from 'rxjs/operators';
import { Question } from './models/queation.model';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zoomInfoTask';
  questionN: Question = {
    "category": "",
    "correct_answer": "",
    "difficulty": "easy",
    "incorrect_answers": [],
    "question": "",
    "type": "multiple"
  };
  private questionSub: Subscription;
  timeIntervalSeconds = 20;
  private leftSeconds = 20;
  questions: Question[] = [];
  numberOfAttempts = 3;
  //when component is constructed trying to get data if is there something
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchQuestions().subscribe((question: Question) => {
      this.questions.push(question);
      this.questionN = question;
      setInterval(() => { this.nextQuestion() }, this.timeIntervalSeconds * 1000);
    });
  }


  nextQuestion() {
    //fetching Questions to get next one if correct answer or time is up or wrong 3 strike.
    this.dataService.fetchQuestions().subscribe((question: Question) => {
      if (this.questions.length === 10) {
        console.log(this.questions);
        return;
      } else {
        this.numberOfAttempts = 3;
        if (!this.questionExists(question)) {
          this.questions.push(question);
          this.questionN = question;
        } else {
          this.nextQuestion();
        }
      }
    });
  }


  questionExists(question) {
    return this.questions.some(function (el) {
      return el.question === question;
    });
  }

  isCorrectAns(ans) {
    if (ans === this.questionN.correct_answer) {
      alert("Grate!!!");
      this.nextQuestion();
    } else {
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
