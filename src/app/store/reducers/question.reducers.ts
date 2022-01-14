
import { Question } from '../../../app/models/queation.model';
import { createReducer, on } from '@ngrx/store'
import * as QAcations from '../actions/question.actions';
export interface QuestionState {
  question: Question[],
  triesLeft: number,
  currentIndex: number
}

export const initialState: QuestionState = {
  question: null,
  triesLeft: 3,
  currentIndex: -1
};

export const questionReducer = createReducer<QuestionState>(
  initialState,
  on(QAcations.retrievedAll,
    (state, action) => {

      return {
        ...state,
        question: action.questions,
        triesLeft: 3,
        currentIndex: 0
      }
    }
  ),
  on(QAcations.next,
    (state) => {
      return {
        ...state,
        triesLeft: 3,
        currentIndex: state.currentIndex + 1
      }
    }),
  on(QAcations.wrong,
    (state) => {
      return {
        ...state,
        triesLeft: state.triesLeft - 1
      }
    })
)
