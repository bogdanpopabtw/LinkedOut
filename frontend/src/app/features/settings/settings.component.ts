import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../shared/models/user.model';
import { take } from 'rxjs/operators';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  private usersService = inject(UsersService);

  minDate = new Date(1950, 0, 1)
  maxDate = new Date();

  settingsForm = new FormGroup({
  firstName: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
    Validators.pattern(/^[a-zA-ZăâîșțĂÂÎȘȚ\- ]+$/),
  ]),
  lastName: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
    Validators.pattern(/^[a-zA-ZăâîșțĂÂÎȘȚ\- ]+$/),
  ]),
  headline: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(100),
  ]),
  profileImageUrl: new FormControl('', [
    Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i),
  ]),
  dateOfBirth: new FormControl(''),
  location: new FormControl('', [
    Validators.minLength(2),
    Validators.maxLength(50),
    Validators.pattern(/^[a-zA-ZăâîșțĂÂÎȘȚ\-, ]+$/),
  ]),

  email: new FormControl('', [
    Validators.required,
    Validators.email,
  ]),
  phone: new FormControl('', [
    Validators.pattern(/^\+?[0-9\s\-()]{10,}$/),
    Validators.minLength(10),
    Validators.maxLength(20),
  ]),
  website: new FormControl('', [
    Validators.pattern(/^https?:\/\/.+/),
  ]),
  about: new FormControl('', [
    Validators.maxLength(500),
  ])
});

  ngOnInit(): void {
    this.formPopulator();
  }

  private formPopulator(): void{
    this.usersService.currentUser()
    .pipe(take(1)).subscribe(user => {
    this.settingsForm.patchValue(user as User);
    });
  }
}
