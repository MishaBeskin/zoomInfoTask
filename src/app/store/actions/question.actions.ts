import { Action } from '@ngrx/store';


export enum QuestionActionTypes {
  GET_QUESTION = 'GetQuestion'
}

export class GetQuestion implements Action {
  readonly type = QuestionActionTypes.GET_QUESTION;
}
export type All =
  | GetQuestion;
