import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import {
  initAuth,
  initAuthFailure,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  logout,
  updateCurrentUser,
} from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(loadCurrentUser, (state) => ({ ...state, loading: true, error: null })),

  on(loadCurrentUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    isAuthenticated: true,
    isAuthInitialized: true,
    loading: false,
  })),

  on(loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    isAuthInitialized: true,
    loading: false,
    error,
  })),

  on(updateCurrentUser, (state, { user }) => ({
    ...state,
    currentUser: user,
  })),

  on(initAuth, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(initAuthFailure, (state) => ({
    ...state,
    isAuthenticated: false,
    isAuthInitialized: true,
    loading: false,
  })),

  on(logout, () => initialAuthState),
);