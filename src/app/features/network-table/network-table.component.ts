import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserTableFacade } from '../../store/user-table/user-table.facade';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { HighlightDirective } from '../../shared/directives/highlight/highlight.directive';
import { TechIconsDirective } from '../../shared/directives/tech-icons/tech-icons.directive';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-network-table',
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    AvatarComponent,
    HighlightDirective,
    TechIconsDirective,
  ],
  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
})
export class NetworkTableComponent {
  private readonly users = inject(UserTableFacade);
  private readonly router = inject(Router);

  protected readonly users$ = this.users.users$;

  protected readonly displayedColumns: string[] = ['name', 'headline', 'location', 'connections'];

  protected onRowClick(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
