import { Action, createAction, props } from "@ngrx/store";
import { Author } from "./model/author.model";

export const addAuthor = createAction(
  '[Author] Add Author',
  props<{ author: Author }>()
);

export const addAuthors = createAction(
  '[Author] Add Authors',
  props<{ authors: Author[] }>()
);

export const updateAuthors = createAction(
  '[Author] Update Authors',
  props<{ index: number, author: Author }>()
);

export const deleteAuthors = createAction(
  '[Author] Delete Authors',
  props<{ index: number}>()
);