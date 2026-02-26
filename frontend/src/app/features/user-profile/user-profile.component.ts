import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly usersService = inject(UsersService);

  public user$: Observable<User> = this.usersService.currentUser();

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.user$ = this.usersService.getUserById(+id);
    }
  }
}
