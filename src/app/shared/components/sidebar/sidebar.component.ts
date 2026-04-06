import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AvatarComponent } from "../avatar/avatar.component";
import { AuthFacade } from '../../../store/auth/auth.facade';
import { AuthService } from '../../../core/services/auth.service';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    AsyncPipe,
    AvatarComponent
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly authService = inject(AuthService);

  protected readonly currentUser$ = this.authFacade.currentUser$;
  protected readonly isAuthenticated$ = this.authFacade.isAuthenticated$;

  protected navItems: NavItem[] = [
    { icon: 'home', label: 'Network', route: '/network' },
    { icon: 'business', label: 'Companies', route: '/companies' },
    { icon: 'work', label: 'Jobs', route: '/jobs' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
    { icon: 'signal_cellular_alt', label: 'Signals', route: '/signals' },
  ]

  protected logout(): void {
    this.authService.logout();
    this.isCollapsed = true;
  }

  protected isCollapsed = true;

  protected toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
