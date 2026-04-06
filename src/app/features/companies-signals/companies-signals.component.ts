import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { CompaniesService } from '../../shared/services/company.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-companies-signals',
  imports: [
    MatFormField,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
],
  templateUrl: './companies-signals.component.html',
  styleUrl: './companies-signals.component.scss',
})
export class CompaniesSignalsComponent {
  private readonly companiesService = inject(CompaniesService);

  protected readonly displayedColumns: string[] = ['company', 'location', 'website', 'jobs'];

  protected searchControl = new FormControl('');
  protected pageSize = signal(10);
  protected pageNumber = signal(1);

  protected searchSignal = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(''),
      tap(() => this.pageNumber.set(1)),
    )
  );

  protected params = computed(() => ({
    search: this.searchSignal() || undefined,
    page: this.pageNumber(),
    limit: this.pageSize(),
  }));

  protected data = toSignal(
    toObservable(this.params).pipe(
      switchMap(params => this.companiesService.getAll(params))
    )
  );

  protected isEmpty = computed(() => this.data()?.data.length === 0);

  protected clearSearch(): void {
    this.pageNumber.set(1);
    this.searchControl.setValue('');
  }

  protected onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.pageNumber.set(event.pageIndex + 1);
  }
}

