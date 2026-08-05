import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService)
  private router = inject(Router)
  private fb = inject(FormBuilder)

  public registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  public autenticar(): void {
    if (this.registerForm.invalid) return
    let { username, email, password } = this.registerForm.getRawValue()
    this.authService.register(username, email, password)
    if (!this.authService.isLoggedIn()) return
    this.router.navigate(['/menu'])
  }
}
