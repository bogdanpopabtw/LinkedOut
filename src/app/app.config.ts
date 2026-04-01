import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode, provideAppInitializer, inject } from '@angular/core';
import { filter, take } from 'rxjs';
import { AuthFacade } from './store/auth/auth.facade';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
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
import { themeReducer } from './store/ui/ui.reducer';
import { THEME_FEATURE_KEY } from './store/ui/ui.selectors';
import { ThemeEffects } from './store/ui/ui.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
        [AUTH_FEATURE_KEY]: authReducer,
        [USER_TABLE_FEATURE_KEY]: userTableReducer,
        [THEME_FEATURE_KEY]: themeReducer,
    }),
    provideEffects(AuthEffects, UserTableEffects, ThemeEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideCustomIcons(),
    provideAppInitializer(() => {
      const authFacade = inject(AuthFacade);
      authFacade.init();
      return authFacade.isAuthInitialized$.pipe(
        filter((isAuthInitialized: boolean) => isAuthInitialized === true),
        take(1),
      );
    })
],
};
