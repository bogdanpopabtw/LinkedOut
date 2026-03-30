import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserTableState } from "./user-table.state";

export const USER_TABLE_FEATURE_KEY = 'userTable';

export const selectUserTableState = createFeatureSelector<UserTableState>(USER_TABLE_FEATURE_KEY);

export const selectUsers = createSelector(selectUserTableState, (s) => s.users);
export const selectPreferences = createSelector(selectUserTableState, (s) => s.preferences);
export const selectUserTableLoading = createSelector(selectUserTableState, (s) => s.loading);
export const selectTotalItems = createSelector(selectUserTableState, (s) => s.totalItems);