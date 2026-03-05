import { Directive, inject, HostListener, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appSaveButton]'
})
export class SaveButtonDirective {
  private snackBar = inject(MatSnackBar);

  @HostListener('click') onMouseClick() {
    this.snackBar.open('Your changes have been saved successfully!', 'Dismiss', {
      duration: 3000,
    });
  }
}
