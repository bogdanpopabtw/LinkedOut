import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { initUserTable, savePreferences } from './user-table.actions';
import {
  selectUsers,
  selectTotalItems,
  selectPreferences,
  selectUserTableLoading,
  selectUserTableError,
} from './user-table.selectors';
import { TablePreferences } from '../../shared/models/table-preferences.model';

@Injectable({ providedIn: 'root' })
export class UserTableFacade {
  private readonly store = inject(Store);

  readonly users$ = this.store.select(selectUsers);
  readonly totalItems$ = this.store.select(selectTotalItems);
  readonly preferences$ = this.store.select(selectPreferences);
  readonly loading$ = this.store.select(selectUserTableLoading);
  readonly error$ = this.store.select(selectUserTableError);

  init(): void {
    this.store.dispatch(initUserTable());
  }

  savePreferences(preferences: TablePreferences): void {
    this.store.dispatch(savePreferences({ preferences }));
  }
}