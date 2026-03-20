import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../store/auth/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { AvatarComponent } from "../avatar/avatar.component";

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
  private readonly store = inject(Store);
  currentUser$ = this.store.select(selectCurrentUser);

  isCollapsed = true;

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  navItems: NavItem[] = [
    { icon: 'home', label: 'Network', route: '/network' },
    { icon: 'business', label: 'Companies', route: '/companies' },
    { icon: 'work', label: 'Jobs', route: '/jobs' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ]
}
