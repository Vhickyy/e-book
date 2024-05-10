import { createSelector } from "@ngrx/store";
import { AppState } from "../appState";

const selectCartState = (state:AppState) => state.cart;

export const selectCart = createSelector(
    selectCartState,
    (state) => state.cart
)

export const selectCartLength = createSelector(
    selectCartState,
    (state) => state.cartLength
)

export const selectWishlist = createSelector(
    selectCartState,
    (state) => state.wishlist
)