import { Component, inject, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserTableFacade } from '../../store/user-table/user-table.facade';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { HighlightDirective } from '../../shared/directives/highlight/highlight.directive';
import { TechIconsDirective } from '../../shared/directives/tech-icons/tech-icons.directive';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, take, filter, withLatestFrom} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-network-table',
  imports: [
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormField,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    AvatarComponent,
    HighlightDirective,
    TechIconsDirective,
  ],
  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
})
export class NetworkTableComponent {
  private readonly userTableFacade = inject(UserTableFacade);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly users$ = this.userTableFacade.users$;
  protected readonly currentPreferences$ = this.userTableFacade.preferences$;
  protected readonly loading$ = this.userTableFacade.loading$;
  protected readonly totalItems$ = this.userTableFacade.totalItems$;
  protected readonly searchControl = new FormControl('');

  protected readonly displayedColumns: string[] = ['name', 'headline', 'location', 'connections'];

  ngOnInit(): void {
    this.userTableFacade.init();
    this.syncSearchFromPreferences();
    this.listenToSearchChanges();
  }

  private syncSearchFromPreferences(): void {
    this.currentPreferences$
      .pipe(
        filter(preferences => preferences !== null),
        take(1),
      )
      .subscribe(preferences => {
        if (preferences?.searchFilter) {
          this.searchControl.setValue(preferences.searchFilter, { emitEvent: false });
        }
      }
    );
  }

  private listenToSearchChanges(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        withLatestFrom(this.currentPreferences$),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(([searchFilter, preferences]) => {
        if (!preferences) return;

          this.userTableFacade.savePreferences({
            ...preferences,
            searchFilter: searchFilter ?? '',
        });
      });
  }

  protected onPageChange(event: PageEvent): void {
    this.currentPreferences$.pipe(take(1)).subscribe(preferences => {
      if (!preferences) return;

      this.userTableFacade.savePreferences({
        ...preferences,
        pagination: {
          pageSize: event.pageSize,
          pageNumber: event.pageIndex + 1,
        },
      });
    });
  }

  protected onRowClick(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
}