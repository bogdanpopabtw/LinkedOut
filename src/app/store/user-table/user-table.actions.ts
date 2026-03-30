import { createAction, props } from "@ngrx/store";
import { User } from "../../shared/models/user.model";
import { TablePreferences } from "../../shared/models/table-preferences.model";

export const initUserTable = createAction('[UserTable] Init');
 
export const loadUsers = createAction(
  '[UserTable] Load Users',
  props<{ preferences: TablePreferences | null }>(),
);
 
export const loadUsersSuccess = createAction(
  '[UserTable] Load Users Success',
  props<{ users: User[]; totalItems: number }>(),
);
 
export const loadUsersFailure = createAction(
  '[UserTable] Load Users Failure',
  props<{ error: string }>(),
);
 
export const setPreferences = createAction(
  '[UserTable] Set Preferences',
  props<{ preferences: TablePreferences | null }>(),
);
 
export const savePreferences = createAction(
  '[UserTable] Save Preferences',
  props<{ preferences: TablePreferences }>(),
);
 
export const savePreferencesSuccess = createAction(
  '[UserTable] Save Preferences Success',
  props<{ preferences: TablePreferences }>(),
);
 
export const savePreferencesFailure = createAction(
  '[UserTable] Save Preferences Failure',
  props<{ error: string }>(),
);
 