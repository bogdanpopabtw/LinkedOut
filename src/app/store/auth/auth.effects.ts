import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersService } from '../../shared/services/users.service';
import { initAuth, initAuthFailure, loadCurrentUser, loadCurrentUserFailure, loadCurrentUserSuccess } from './auth.actions';
import { initTheme } from '../ui/ui.actions';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);
  private readonly authService = inject(AuthService);

  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth),
      switchMap(() => {
        const userId = this.authService.getUserIdFromToken();
        if (!this.authService.isTokenValid() || !userId) {
          return of(initAuthFailure());
        }
        return of(loadCurrentUser({ userId }));
      }),
    ),
  );

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentUser),
      switchMap(({ userId }) =>
        this.usersService.getUserById(userId).pipe(
          map((user) => loadCurrentUserSuccess({ user })),
          catchError((err) =>
            of(loadCurrentUserFailure({ error: err?.message ?? 'Unknown error' })),
          ),
        ),
      ),
    ),
  );

  loadUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentUserSuccess),
      map(() => initTheme()),
    ),
  );
}