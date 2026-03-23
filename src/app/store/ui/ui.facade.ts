import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { initTheme, setTheme } from './ui.actions';
import { selectDarkTheme, selectDarkThemeLoading } from './ui.selectors';

@Injectable({ providedIn: 'root' })
export class ThemeFacade {
  private readonly store = inject(Store);

  readonly isDarkTheme$ = this.store.select(selectDarkTheme);
  readonly loading$ = this.store.select(selectDarkThemeLoading);

  init(): void {
    this.store.dispatch(initTheme());
  }

  toggleTheme(isDarkTheme: boolean): void {
    this.store.dispatch(setTheme({ isDarkTheme }));
  }
}