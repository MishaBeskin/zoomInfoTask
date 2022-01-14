
import { Question } from 'src/app/models/queation.model';
import { QuestionActionTypes, All } from '../actions/question.actions';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  question: Question | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  question: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case QuestionActionTypes.GET_QUESTION: {
      return {
        ...state,
        question: {
        },
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}
