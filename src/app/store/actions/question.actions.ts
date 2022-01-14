import { createAction, props } from '@ngrx/store';
import { Question } from 'src/app/models/queation.model';


export const getAll = createAction(
  'Get All Questions'
);
export const retrievedAll = createAction(
  'Retrieved All Questions',
  props<{ questions: Question[] }>()
);
export const next = createAction(
  'Next Question'
);
export const check = createAction(
  'Check Questions',
  props<{ answer: string }>()
);
export const correct = createAction(
  'Correct Answer'
);
export const wrong = createAction(
  'Wrong Answer'
);
export const finished = createAction(
  'Finished Questions'
);

