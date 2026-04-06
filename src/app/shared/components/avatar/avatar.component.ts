import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() public firstName: string = '';
  @Input() public lastName: string = '';
  @Input() public size: string = 'small';
  @Input() public borderStyle?: string;

  get initials(): string {
    const firstInitial = this.firstName.charAt(0).toUpperCase();
    const lastInitial = this.lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }

  get sizeStyles(): { width: string; height: string } {
    switch (this.size) {
      case 'medium':  return { width: '64px', height: '64px' };
      case 'large':  return { width: '120px', height: '120px' };
      default:       return { width: '42px', height: '42px' };
    }
  }

  get backgroundColor(): string {
    return '#0a66c2';
  }
}
