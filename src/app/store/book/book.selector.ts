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

export const selectBookLoading = createSelector(
    selectBookState,
    (state) => state.loading
)

export const selectBookIds = createSelector(
    selectBookState,
    (state) => state.ids
)

export const selectAuthorBook = createSelector(
    selectBookState,
    (state) => state.authorBooks
)

export const selectPages = createSelector(
    selectBookState,
    (state) => state.pageSize
)

export const selectError = createSelector(
    selectBookState,
    (state) => state.error
)