import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuestionState } from "./reducers/question.reducers";

const getQuestionState = createFeatureSelector<QuestionState>('questions');



//Selectors for questions current index, and tries left
export const getQuestions = createSelector(
  getQuestionState,
  (state: QuestionState) => state.question
);

export const getTriesLef = createSelector(
  getQuestionState,
  (state: QuestionState) => state.triesLeft
);


export const getCurrentIndex = createSelector(
  getQuestionState,
  (state: QuestionState) => state.currentIndex
);
