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

export const selectError = createSelector(
    selectAuthState,
    (state) => state.error
)