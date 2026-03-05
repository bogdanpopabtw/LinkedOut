import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { MatDividerModule } from '@angular/material/divider';
import { IfCurrentUserDirective } from '../../shared/directives/if-current-user/if-current-user.directive';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule, SectionCardComponent, AvatarComponent, MatDividerModule, IfCurrentUserDirective, MatButtonModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly usersService = inject(UsersService);

  public user$!: Observable<User>;

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    if(id) {
    this.user$ = this.usersService.getUserById(+id);
    }
  }
}
