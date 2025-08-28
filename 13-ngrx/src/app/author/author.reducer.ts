import { createReducer, on } from "@ngrx/store";
import { addAuthor, addAuthors, deleteAuthors, updateAuthors } from './author.action';
import { Author } from "./model/author.model";

const initialState: State = {
    authors: [
        new Author("Ben", "Smith"),
        new Author("Steven", "First")
    ]
};

const _authorReducer = createReducer(
    initialState,
    on(addAuthor, (state, { author }) => ({
        ...state,
        authors: [...state.authors, author],
    })),
    on(addAuthors, (state, { authors }) => ({
        ...state,
        authors: [...state.authors, ...authors],
    })),
    on(updateAuthors, (state, payload: { index: number, author: Author }) => {
        const authors = [...state.authors];
        authors[payload.index] = payload.author;
        return {
            ...state,
            authors: authors
        }
    }),
    on(deleteAuthors, (state, payload: { index: number }) => {
        const authors = [...state.authors];
        authors.splice(payload.index, 1)
        return {
            ...state,
            authors: authors
        }
    }),
);

export interface State {
    authors: Author[];
}

export function authorReducer(state: State | undefined, action: any): State {
    return _authorReducer(state, action);
}