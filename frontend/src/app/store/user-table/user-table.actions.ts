import { createAction, props } from "@ngrx/store";
import { User } from "../../shared/models/user.model";
import { TablePreferences } from "../../shared/models/table-preferences.model";


export const loadUsers = createAction(
  '[UserTable] Load Users',
);

export const loadUsersSuccess = createAction(
  '[UserTable] Load Users Success',
  props<{ users: User[] }>(),
);

export const loadUsersFailure = createAction(
  '[UserTable] Load Users Failure',
  props<{ error: string }>(),
);

export const loadTablePreferences = createAction('[UserTable] Load Table Preferences');

export const loadTablePreferencesSuccess = createAction(
  '[UserTable] Load Table Preferences Success',
  props<{ preferences: TablePreferences }>(),
);

export const loadTablePreferencesFailure = createAction(
  '[UserTable] Load Table Preferences Failure',
  props<{ error: string }>(),
)

export const saveTablePreferences = createAction(
  '[UserTable] Save Table Preferences',
  props<{ preferences: TablePreferences}>(),
);

export const saveTablePreferencesSuccess = createAction(
  '[UserTable] Save Table Preferences Success',
  props<{ preferences: TablePreferences }>(),
);

export const saveTablePreferencesFailure = createAction(
  '[UserTable] Save Table Preferences Failure',
  props<{ error: string }>(),
);