import { Component, Inject, inject } from '@angular/core';
import { MatCard, MatCardContent } from "@angular/material/card";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    MatCard, 
    MatCardContent, 
    ReactiveFormsModule, 
    MatIconModule,
    MatInputModule, 
    MatButtonModule, 
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected registerForm = new FormGroup({
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

    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/(?=.*[A-Z])/),
    ]),
  });

  protected onSubmit(): void {
    if(this.registerForm.invalid) return;

    const { firstName, lastName, email, password } = this.registerForm.value;

    this.authService.register({
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      password: password!,
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error(err),
    })

  }

  protected hide = true;

  protected togglePassword() {
    this.hide = !this.hide;
  }
}
