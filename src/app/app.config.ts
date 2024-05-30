import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { authReducer } from './store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import * as authEffect from './store/auth/auth.effect'
import * as bookEffect from "./store/book/book.effect"
import * as cartEffect from "./store/cart/cart.effects"
import * as libraryEffect from "./store/library/library.effects"
import { authInterceptor } from './authInterceptors';
import { bookReducer } from './store/book/book.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { libraryReducer } from './store/library/library.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore(),
    provideState(
      {
        name: 'auth',
        reducer: authReducer
      }
    ),
    provideState({
      name: "book",
      reducer : bookReducer
    }),
    provideState({
      name: "cart",
      reducer : cartReducer
    }),
    provideState({
      name: "library",
      reducer : libraryReducer
    }),
    provideEffects(authEffect,bookEffect,cartEffect,libraryEffect),
    ],
};
