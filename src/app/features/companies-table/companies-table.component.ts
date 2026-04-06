import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { CompaniesService } from '../../shared/services/company.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Company } from '../../shared/models/company.model';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PaginatedResponse } from '../../shared/models/pagination.model';

@Component({
  selector: 'app-companies-table',
  imports: [
    MatFormField,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
],
  templateUrl: './companies-table.component.html',
  styleUrl: './companies-table.component.scss',
})
export class CompaniesTableComponent implements OnInit {
  private readonly companiesService = inject(CompaniesService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly displayedColumns: string[] = ['company', 'location', 'website', 'jobs'];
  protected data$!: Observable<PaginatedResponse<Company>>;

  protected searchControl = new FormControl('');
  protected pageSize = 10;
  protected pageNumber = 1;

  ngOnInit(): void {
    this.loadCompanies();
    this.setChanges();
  }

  private setChanges(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.pageNumber = 1;
        this.loadCompanies();
      }
    );
  }

  private loadCompanies(): void {
     this.data$ = this.companiesService.getAll({
      search: this.searchControl.value || undefined,
      page: this.pageNumber,
      limit: this.pageSize,
    });
  }

  protected onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadCompanies();
  }
}
