import { Directive, Input, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appIfCurrentUser]'
})
export class IfCurrentUserDirective {
  @Input() appIfCurrentUser?: number;

  private templateRef = inject(TemplateRef<any>);
  private viewContainerRef = inject(ViewContainerRef);
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
    if(!this.appIfCurrentUser) {
      return;
    }
    
    this.usersService.currentUser().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(currentUser => {
      this.viewContainerRef.clear();

      if(currentUser && currentUser.id === this.appIfCurrentUser) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
