import { createSelector } from "@ngrx/store";
import { AppState } from "../appState";

const selectCartState = (state:AppState) => state.cart;


export const selectCart = createSelector(
    selectCartState,
    (state) => state.cart
)
export const seletCartLoading = createSelector(
    selectCartState,
    (state) => state.loading
)

export const selectCartLength = createSelector(
    selectCartState,
    (state) => state.cartLength
)

export const selectWishlist = createSelector(
    selectCartState,
    (state) => state.wishlist
)

export const selectOrders = createSelector(
    selectCartState,
    (state) => state.orders
)

export const selectBookIds = createSelector(
    selectCartState,
    (state) => state.ids
)

export const selectCartError = createSelector(
    selectCartState,
    (state) => state.error
)