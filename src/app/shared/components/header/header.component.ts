import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeFacade } from '../../../store/ui/ui.facade';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly service = inject(UsersService);
  private readonly themeFacade = inject(ThemeFacade);

  protected readonly isDarkTheme$ = this.themeFacade.isDarkTheme$;

  protected toggleTheme(): void {
    this.isDarkTheme$.pipe(take(1)).subscribe(isDarkTheme => {
      this.themeFacade.toggleTheme(!isDarkTheme);
    });
  }
}
  