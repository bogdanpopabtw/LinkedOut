import { createReducer, on } from "@ngrx/store";
import { initialUiState } from "./ui.state";
import { initTheme, setTheme, setThemeSuccess, setThemeFailure } from "./ui.actions";

export const themeReducer = createReducer(
    initialUiState,

    on(initTheme, (state) => ({ ...state, loading: true, error: null })),

    on(setTheme, (state, {isDarkTheme}) => ({
      ...state,
      isDarkTheme, 
      loading: true, 
      error: null})),

    on(setThemeSuccess, (state, { isDarkTheme }) => ({
      ...state,
      isDarkTheme,
      loading: false,
    })),

    on(setThemeFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
);