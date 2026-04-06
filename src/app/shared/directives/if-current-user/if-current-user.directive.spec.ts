import { Component } from '@angular/core';
import { IfCurrentUserDirective } from './if-current-user.directive';
import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFacade } from '../../../store/auth/auth.facade';

const currentUser$ = new BehaviorSubject<{ id: number } | null>(null);

const mockAuthFacade = {
  currentUser$
};

@Component({
  standalone: true,
  imports: [IfCurrentUserDirective],
  template: '<div *appIfCurrentUser="1">visible</div>'
})
class TestHostComponent {}

describe('IfCurrentUserDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: AuthFacade, useValue: mockAuthFacade }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should render the template when appIfCurrentUser matches the current user id', () => {
    currentUser$.next({ id: 1 });
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('div');
    expect(el).toBeTruthy();
    expect(el.textContent).toBe('visible');
  })

  it('should not render the template when ids do not match', () => {
    currentUser$.next({ id: 30 });
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('div');
    expect(el).toBeNull();
  })

  it('should clear and re-evaluate the view when the current user changes in the store', () => {
    currentUser$.next({ id: 30 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div')).toBeNull();

    currentUser$.next({ id: 1 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div')).toBeTruthy();
  })
});