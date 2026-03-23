import { createAction, props } from "@ngrx/store";

export const initTheme = createAction('[Theme] Load Theme');

export const setTheme = createAction(
    '[Theme] Set Theme',
    props<{ isDarkTheme: boolean }>(),
);

export const setThemeSuccess = createAction(
    '[Theme] Set Theme Success',
    props<{ isDarkTheme: boolean }>(),
);

export const setThemeFailure = createAction(
    '[Theme] Set Theme Failure',
    props<{ error: string }>(),
);
