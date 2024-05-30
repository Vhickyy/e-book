import { createSelector } from "@ngrx/store";
import { AppState } from "../appState";

const selectLibraryState = (state:AppState) => state.library;

export const selectLibrary = createSelector(
    selectLibraryState,
    (state) => state.library
)

export const selectLoading = createSelector(
    selectLibraryState,
    (state) => state.loading
)

// export const selectCartLength = createSelector(
//     selectCartState,
//     (state) => state.cartLength
// )

// export const selectWishlist = createSelector(
//     selectCartState,
//     (state) => state.wishlist
// )