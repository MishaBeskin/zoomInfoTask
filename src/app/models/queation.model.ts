export class Question {
  constructor(
    public correct_answer: string,
    public incorrect_answers: Array<string>,
    public question: string,
  ) { }
}
