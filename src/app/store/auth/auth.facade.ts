import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAuth, loadCurrentUser, logout } from './auth.actions';
import { selectAuthError, selectAuthLoading, selectCurrentUser, selectIsAuthenticated, selectIsAuthInitialized } from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  readonly currentUser$ = this.store.select(selectCurrentUser);
  readonly loading$ = this.store.select(selectAuthLoading);
  readonly isAuthenticated$ = this.store.select(selectIsAuthenticated);
  readonly isAuthInitialized$ = this.store.select(selectIsAuthInitialized);
  readonly error$ = this.store.select(selectAuthError);

  init(): void {
    this.store.dispatch(initAuth());
  }

  loadUser(userId: number): void {
    this.store.dispatch(loadCurrentUser({ userId }));
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}