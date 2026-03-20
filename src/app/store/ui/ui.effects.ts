import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, withLatestFrom } from 'rxjs';
import { catchError, map, switchMap, } from 'rxjs/operators';
import { initTheme, setTheme, setThemeSuccess, setThemeFailure } from './ui.actions';
import { selectCurrentUser } from '../auth/auth.selectors';
import { Store } from '@ngrx/store';
import { UsersService } from '../../shared/services/users.service';

@Injectable()
export class ThemeEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly usersService = inject(UsersService);

  initTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initTheme),
      withLatestFrom(this.store.select(selectCurrentUser)),
      switchMap(([, currentUser]) => {
        const isDarkTheme = currentUser?.isDarkTheme ?? false;
        document.documentElement.classList.toggle('dark-theme', isDarkTheme);
        return of(setTheme({ isDarkTheme }));
      }),
    ),
  );

  setTheme$ = createEffect(() =>
  this.actions$.pipe(
    ofType(setTheme),
    withLatestFrom(this.store.select(selectCurrentUser)),
    switchMap(([{ isDarkTheme }, currentUser]) => {
      document.documentElement.classList.toggle('dark-theme', isDarkTheme);
      return this.usersService.updateUser(currentUser!.id, { isDarkTheme }).pipe(
        map(() => setThemeSuccess({ isDarkTheme })),
        catchError((err) => of(setThemeFailure({ error: err?.message ?? 'Unknown error'}))),
        );
      }),
    ), 
  );
}