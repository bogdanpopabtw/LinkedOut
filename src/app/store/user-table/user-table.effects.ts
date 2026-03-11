import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { UsersService } from '../../shared/services/users.service';
import { selectCurrentUser } from '../auth/auth.selectors';
import { Store } from '@ngrx/store';
import { 
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  loadTablePreferences,
  loadTablePreferencesSuccess,
  loadTablePreferencesFailure,
  saveTablePreferences,
  saveTablePreferencesSuccess,
  saveTablePreferencesFailure,
} from './user-table.actions';

@Injectable()
export class UserTableEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);
  private readonly store = inject(Store);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.usersService.getAllUsers().pipe(
          map((response) => {
            const users = response.data;
            return users
              ? loadUsersSuccess({ users })
              : loadUsersFailure({ error: 'No users found' });
          }),
          catchError((err) =>
            of(loadUsersFailure({ error: err?.message ?? 'Unknown error' })),
          ),
        ),
      ),
    ),
  );

  loadTablePreferences$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadTablePreferences),
      withLatestFrom(this.store.select(selectCurrentUser)),
      map(([, user]) =>
        user?.tablePreferences
          ? loadTablePreferencesSuccess({ preferences: user.tablePreferences })
          : loadTablePreferencesFailure({ error: 'No preferences found' }),
          ),
      ),
    );

  saveTablePreferences$ = createEffect(() =>
  this.actions$.pipe(
    ofType(saveTablePreferences),
    withLatestFrom(this.store.select(selectCurrentUser)),
    switchMap(([{ preferences }, user]) =>
      this.usersService.updateUser(user!.id, { tablePreferences: preferences }).pipe(
        map(() => saveTablePreferencesSuccess({ preferences })),
        catchError((err) =>
          of(saveTablePreferencesFailure({ error: err?.message ?? 'Unknown error' })),
      ),
    )),
  ));
}