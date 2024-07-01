import { createSelector } from "@ngrx/store";
import { AppState } from "../appState";

const selectAuthState = (state:AppState) => state.auth;

export const selectLoading = createSelector(
    selectAuthState,
    (state) => state.loading
)

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
)

export const selectAuthor = createSelector(
    selectAuthState,
    (state) => state.author
)

export const selectError = createSelector(
    selectAuthState,
    (state) => state.error
)
export const selectData = createSelector(
    selectAuthState,
    (state) => state?.data?.code
)
export const selectToken = createSelector(
    selectAuthState,
    (state) => state?.data?.token
)
