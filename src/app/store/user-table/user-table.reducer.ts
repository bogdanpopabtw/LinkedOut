import { createReducer, on } from "@ngrx/store";
import { initialUserTableState } from "./user-table.state";
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
}  from "./user-table.actions";

export const userTableReducer = createReducer(
  initialUserTableState,

  on(loadUsers, (state) => ({ ...state, loading: true, error: null })),

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loadTablePreferences, (state) => ({ ...state, loading: true, error: null })),
  
  on(loadTablePreferencesSuccess, (state, { preferences }) => ({
    ...state,
    preferences: preferences,
    loading: false,
  })),
  
  on(loadTablePreferencesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(saveTablePreferences, (state) => ({ ...state, loading: true, error: null })),
  
  on(saveTablePreferencesSuccess, (state, { preferences }) => ({
    ...state,
    preferences: preferences,
    loading: false,
  })),
  
  on(saveTablePreferencesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);