import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';
import { AuthFacade } from '../../store/auth/auth.facade';
import { Router, RouterLink } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  protected loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  protected onSubmit(): void {
    const { email, password } = this.loginForm.value;

    this.authService.login({ email: email!, password: password! }).pipe(
      switchMap(() => this.authFacade.isAuthenticated$.pipe(
        filter((isAuthenticated) => isAuthenticated === true),
        take(1),
      )),
    ).subscribe({
      next: () => this.router.navigate(['/network']),
      error: () => this.loginForm.get('password')?.setErrors({ invalidCredentials: true }),
    });
  }

  protected hide = true;

  protected togglePassword() {
    this.hide = !this.hide;
  }
}
