import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { JobsService } from '../../shared/services/job.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Job } from '../../shared/models/job.model';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PaginatedResponse } from '../../shared/models/pagination.model';


@Component({
  selector: 'app-jobs-table',
  imports: [
    MatFormField,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './jobs-table.component.html',
  styleUrl: './jobs-table.component.scss',
})
export class JobsTableComponent implements OnInit {
  private readonly jobService = inject(JobsService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly displayedColumns: string[] = ['job', 'location', 'type', 'posted'];
  protected data$!: Observable<PaginatedResponse<Job>>;

  protected searchControl = new FormControl('');
  protected pageSize = 10;
  protected pageNumber = 1;

  ngOnInit(): void {
    this.loadJobs();
    this.setSearch();
  }

  protected setSearch(): void {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe(() => {
      this.pageNumber = 1;
      this.loadJobs();
    });
  }

  protected loadJobs(): void {
    this.data$ = this.jobService.getAll({
      search: this.searchControl.value || undefined,
      page: this.pageNumber,
      limit: this.pageSize,
    });
  }

  protected onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadJobs();
  }
}