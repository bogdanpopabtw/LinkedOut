import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesSignalsComponent } from './companies-signals.component';

describe('CompaniesSignalsComponent', () => {
  let component: CompaniesSignalsComponent;
  let fixture: ComponentFixture<CompaniesSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesSignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
