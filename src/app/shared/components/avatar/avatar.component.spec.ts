import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';

describe('AvatarInitialsComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  it('should return correct initials for john doe', () => {
    component.firstName = 'john';
    component.lastName = 'doe';

    expect(component.initials).toBe('JD');
  });

  it('should handle single-character names', () => {
    component.firstName = 'J';
    component.lastName = 'D';

    expect(component.initials).toBe('JD');
  });

  it('should return correct initials from the DOM', () => {
    component.firstName = 'john';
    component.lastName = 'doe';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.avatar').textContent.trim()).toBe('JD');
  });

  it('should return correct dimensions for small', () => {
    component.size = 'small';
    expect(component.sizeStyles).toEqual({ width: '42px', height: '42px' });
  });

  it('should return correct dimensions for medium', () => {
    component.size = 'medium';
    expect(component.sizeStyles).toEqual({ width: '64px', height: '64px' });
  });

  it('should return correct dimensions for large', () => {
    component.size = 'large';
    expect(component.sizeStyles).toEqual({ width: '120px', height: '120px' });
  });

  it('should fall back to small dimensions for an unknown size', () => {
    component.size = 'unknown';
    expect(component.sizeStyles).toEqual({ width: '42px', height: '42px' });
  });

  it('should always return #0a66c2 for backgroundColor', () => {
    expect(component.backgroundColor).toBe('#0a66c2');
  });

});