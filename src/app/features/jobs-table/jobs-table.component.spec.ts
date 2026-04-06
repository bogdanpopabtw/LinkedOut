import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { JobsTableComponent } from "./jobs-table.component";
import { JobsService } from "../../shared/services/job.service";
import { of } from "rxjs";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const mockResponse = {
  data: [],
  pagination: {
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
  },
};

describe('JobsTableComponent', () => {
  let component: JobsTableComponent;
  let fixture: ComponentFixture<JobsTableComponent>;
  let jobsServiceMock: jasmine.SpyObj<JobsService>;

  beforeEach(async () => {
    jobsServiceMock = jasmine.createSpyObj('JobsService', ['getAll']);
    jobsServiceMock.getAll.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
    imports: [
      MatTableModule,
      MatPaginatorModule,
      MatIconModule,
      MatInputModule,
      ReactiveFormsModule,
      CommonModule,
    ],
    providers: [
      { provide: JobsService, useValue: jobsServiceMock }
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(JobsTableComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });

  describe('Initial load', () => {
    it('should call getAll() on init with no arguments', () => {
      expect(jobsServiceMock.getAll).toHaveBeenCalledWith({
        search: undefined,
        page: 1,
        limit: 10,
      });
    });

    it('data$ should emit the paginated response', (done) => {
    component['data$'].subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
      });
    });
  });

  describe('Search', () => {
  it('should render the search input field in the DOM', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
    });
  });

  describe('Pagination', () => {
  it('should call getAll() with new page and limit on onPageChange()', () => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 20, length: 100 };
    component['onPageChange'](pageEvent);
    
    expect(component['pageNumber']).toBe(2);
    expect(component['pageSize']).toBe(20);
    });
  });

  describe('Edge cases', () => {
  it('should pass undefined as search when search value is empty', () => {
    component['searchControl'].setValue('');
    component['loadJobs']();

    expect(jobsServiceMock.getAll).toHaveBeenCalledWith({
      search: undefined,
      page: 1,
      limit: 10,
    });
  });

  it('should not call getAll() a second time during init if search has not changed',
    fakeAsync(() => {
      expect(jobsServiceMock.getAll.calls.count()).toBe(1);
      tick(300);
      expect(jobsServiceMock.getAll.calls.count()).toBe(1);
    }));
  });
});
