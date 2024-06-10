// 

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { map, switchMap, first, filter, tap } from 'rxjs/operators';
import { selectLoading, selectUser } from '../store/auth/auth.selector';
import { IUser } from '../Model/User';
import { getUser } from '../store/auth/auth.actions';

export const authorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return combineLatest([store.select(selectUser), store.select(selectLoading)]).pipe(
    first(), // Complete after the first emission
    switchMap(([user, loading]) => {
      if (!user && loading) {
        // Dispatch getUser action if the user is not loaded and loading is true
        store.dispatch(getUser());
        
        return combineLatest([store.select(selectUser), store.select(selectLoading)]).pipe(
          filter(([user, loading]) => !loading), // Wait until loading is false
          first(), // Complete after the user is loaded and loading is false
          map(([user]) => {
            if (user?.role !== 'author') {
              return router.createUrlTree(['/books']);
            }
            return true;
          })
        );
      } else {
        if (!loading && user?.role !== 'author') {
          return of(router.createUrlTree(['/books']));
        }
        return of(true);
      }
    })
  );
};

