import * as qest from './reducers/question.reducers';
import { createFeatureSelector } from '@ngrx/store';


export interface QuestionState {
  qestState: qest.State;
}

export const reducers = {
  qest: qest.reducer
};

export const selectQuestionState = createFeatureSelector<QuestionState>('qest');
