import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  activeTab = signal<'login' | 'signup'>('login');
  showOtp = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      role: ['admin', Validators.required],
      email: ['admin@academix.com', [Validators.required, Validators.email]],
      password: ['password123', Validators.required]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['teacher', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  setTab(tab: 'login' | 'signup') {
    this.activeTab.set(tab);
    this.showOtp.set(false);
  }

  toggleOtp() {
    this.showOtp.set(!this.showOtp());
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { role, email } = this.loginForm.value;
      this.authService.login({
        name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
        email,
        role
      });
      this.router.navigate(['/dashboard']);
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { name, email, role } = this.signupForm.value;
      this.authService.login({ name, email, role });
      this.router.navigate(['/dashboard']);
    }
  }
}
