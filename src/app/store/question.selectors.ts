import { state } from "@angular/animations";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuestionState } from "./reducers/question.reducers";

const getFeatureState = createFeatureSelector<QuestionState>('questions');
export const getCurrentQuestion = createSelector(
  getFeatureState,
  (state) =>
);
