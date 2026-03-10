import { Directive, inject, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appInfoIcon]'
})
export class InfoIconDirective {
  private snackBar = inject(MatSnackBar);

  @HostListener('mouseenter') onMouseEnter() {
    this.snackBar.open('Please fill in all required fields correctly.', 'Dismiss', {
      duration: 3000,
    });
  }
}
