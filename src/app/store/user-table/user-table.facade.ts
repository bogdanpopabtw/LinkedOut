import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers, loadTablePreferences, saveTablePreferences } from './user-table.actions';
import { selectUsers, selectPreferences, selectUserTableLoading } from './user-table.selectors';
import { TablePreferences } from '../../shared/models/table-preferences.model';

@Injectable({ providedIn: 'root' })
export class UserTableFacade {
  private readonly store = inject(Store);

  readonly users$ = this.store.select(selectUsers);
  readonly preferences$ = this.store.select(selectPreferences);
  readonly loading$ = this.store.select(selectUserTableLoading);

  init(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadTablePreferences());
  } 

  savePreferences(preferences: TablePreferences): void {
    this.store.dispatch(saveTablePreferences({ preferences }));
  }
}