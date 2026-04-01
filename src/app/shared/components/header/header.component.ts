import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeFacade } from '../../../store/ui/ui.facade';
import { AuthFacade } from '../../../store/auth/auth.facade';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly themeFacade = inject(ThemeFacade);

  protected readonly isAuthenticated$ = this.authFacade.isAuthenticated$;
  protected readonly isDarkTheme$ = this.themeFacade.isDarkTheme$;

  protected toggleTheme(isDarkTheme: boolean | null): void {
    this.themeFacade.toggleTheme(!isDarkTheme);
  }
}
  