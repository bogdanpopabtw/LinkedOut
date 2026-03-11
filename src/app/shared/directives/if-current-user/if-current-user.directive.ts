import { Directive, inject, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthFacade } from '../../../store/auth/auth.facade';

@Directive({
  selector: '[appIfCurrentUser]',
})
export class IfCurrentUserDirective implements OnInit {
  @Input() appIfCurrentUser?: number;

  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly authFacade = inject(AuthFacade);

  ngOnInit(): void {
    this.authFacade.currentUser$.subscribe((currentUser) => {
      this.viewContainer.clear();
      if (this.appIfCurrentUser === currentUser?.id) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
