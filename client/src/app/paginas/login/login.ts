import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService)
  private router = inject(Router)
  private fb = inject(FormBuilder)

  public loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  private verificarAdmin(email: string, password: string): void {
    if (email === 'admin@admin.xyz' && password === 'admin') { this.router.navigate(['/mesas']); return }
      this.router.navigate(['/menu'])
    } 

  public autenticar(): void {
    if (this.loginForm.invalid) return
    let { email, password } = this.loginForm.getRawValue()
    this.authService.login(email, password)
    this.verificarAdmin(email, password)
    if (!this.authService.isLoggedIn()) return
  }
}
