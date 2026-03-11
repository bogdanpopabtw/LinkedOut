import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { authReducer } from './store/auth/auth.reducer';
import { AUTH_FEATURE_KEY } from './store/auth/auth.selectors';
import { AuthEffects } from './store/auth/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideCustomIcons } from './shared/services/icon-registry.service';
import { userTableReducer } from './store/user-table/user-table.reducer';
import { USER_TABLE_FEATURE_KEY } from './store/user-table/user-table.selectors';
import { UserTableEffects } from './store/user-table/user-table.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
        [AUTH_FEATURE_KEY]: authReducer,
        [USER_TABLE_FEATURE_KEY]: userTableReducer,
    }),
    provideEffects(AuthEffects, UserTableEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideCustomIcons()
],
};
