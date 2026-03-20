import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, take, filter } from 'rxjs/operators';
import { UsersService } from '../../shared/services/users.service';
import { selectCurrentUser } from '../auth/auth.selectors';
import {
  initUserTable,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  setPreferences,
  savePreferences,
  savePreferencesSuccess,
  savePreferencesFailure,
} from './user-table.actions';


@Injectable()
export class UserTableEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly usersService = inject(UsersService);

  init$ = createEffect(() =>
  this.actions$.pipe(
    ofType(initUserTable),
    switchMap(() =>
      this.store.select(selectCurrentUser).pipe(
        filter((user) => user !== null),
        take(1),
        switchMap((currentUser) =>
          this.usersService.getUserById(currentUser!.id).pipe(
            switchMap((newUser) => [
              setPreferences({ preferences: newUser.tablePreferences }),
              loadUsers({ preferences: newUser.tablePreferences }),
            ]),
            catchError(() => [
              setPreferences({ preferences: currentUser!.tablePreferences }),
              loadUsers({ preferences: currentUser!.tablePreferences }),
            ]),
          ),
        ),
      ),
    ),
  ),
);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(({ preferences }) =>
        this.usersService
          .getAllUsers({
            search: preferences?.searchFilter,
            page: preferences?.pagination?.pageNumber,
            limit: preferences?.pagination?.pageSize,
          })
          .pipe(
            map((response) =>
              loadUsersSuccess({
                users: response.data,
                totalItems: response.pagination.totalItems,
              }),
            ),
            catchError((err) =>
              of(loadUsersFailure({ error: err?.message ?? 'Unknown error' })),
            ),
          ),
      ),
    ),
  );

  savePreferences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savePreferences),
      withLatestFrom(this.store.select(selectCurrentUser)),
      switchMap(([{ preferences }, currentUser]) => {
        if (!currentUser) {
          return of(savePreferencesFailure({ error: 'No current user found' }));
        }

        return this.usersService
          .updateUser(currentUser.id, { tablePreferences: preferences })
          .pipe(
            switchMap(() => [
              savePreferencesSuccess({ preferences }),
              loadUsers({ preferences }),
            ]),
            catchError((err) =>
              of(savePreferencesFailure({ error: err?.message ?? 'Unknown error' })),
            ),
          );
      }),
    ),
  );
}