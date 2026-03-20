import { createReducer, on } from "@ngrx/store";
import { initialUserTableState } from "./user-table.state";
import {
  initUserTable,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  setPreferences,
  savePreferences,
  savePreferencesSuccess,
  savePreferencesFailure,
}  from "./user-table.actions";

 
export const userTableReducer = createReducer(
  initialUserTableState,
 
  on(initUserTable, (state) => ({ ...state, loading: true, error: null })),
 
  on(loadUsers, (state) => ({ ...state, loading: true, error: null })),
 
  on(loadUsersSuccess, (state, { users, totalItems }) => ({
    ...state,
    users,
    totalItems,
    loading: false,
  })),
 
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
 
  on(setPreferences, (state, { preferences }) => ({
    ...state,
    preferences,
  })),
 
  on(savePreferences, (state, { preferences }) => ({
    ...state,
    preferences,
    loading: true,
    error: null,
  })),
 
  on(savePreferencesSuccess, (state, { preferences }) => ({
    ...state,
    preferences,
    loading: false,
  })),
 
  on(savePreferencesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);