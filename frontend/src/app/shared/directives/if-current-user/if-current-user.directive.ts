import { Directive, Input, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appIfCurrentUser]'
})
export class IfCurrentUserDirective {
  @Input() appIfCurrentUser?: number;

  private templateRef = inject(TemplateRef<any>);
  private viewContainerRef = inject(ViewContainerRef);
  private usersService = inject(UsersService);
  private subscription?: Subscription;

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
    if(!this.appIfCurrentUser) {
      return;
    }
    
    this.subscription = this.usersService.currentUser().subscribe(currentUser => {
      this.viewContainerRef.clear();

    if (currentUser && currentUser.id === this.appIfCurrentUser) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
