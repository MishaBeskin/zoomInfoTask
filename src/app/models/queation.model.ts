export class Question {
  constructor(
    public category: string,
    public correct_answer: string,
    public difficulty: string,
    public incorrect_answers: Array<string>,
    public question: string,
    public type: string
  ) { }
}
