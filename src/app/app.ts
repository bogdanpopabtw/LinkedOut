import { Component, OnInit, inject } from '@angular/core';
import { AuthFacade } from './store/auth/auth.facade';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly authFacade = inject(AuthFacade);

  ngOnInit(): void {
    this.authFacade.init();
  }
}