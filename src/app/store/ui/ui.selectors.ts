import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ThemeState } from "./ui.state";

export const THEME_FEATURE_KEY = 'theme';

export const selectThemeState = createFeatureSelector<ThemeState>(THEME_FEATURE_KEY);

export const selectDarkTheme = createSelector(selectThemeState, (s) => s.isDarkTheme);
export const selectDarkThemeLoading = createSelector(selectThemeState, (s) => s.loading);