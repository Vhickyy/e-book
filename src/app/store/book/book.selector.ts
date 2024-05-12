import { createSelector } from "@ngrx/store";
import { AppState } from "../appState";

const selectBookState = (state:AppState) => state.book;

export const selectBooks = createSelector(
    selectBookState,
    (state) => state.books
)

export const selectBook = createSelector(
    selectBookState,
    (state) => state.book
)

export const selectIncart = createSelector(
    selectBookState,
    (state) => state.incart
)

export const selectPages = createSelector(
    selectBookState,
    (state) => state.pageSize
)