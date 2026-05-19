import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  activeTab = signal<'login' | 'signup'>('login');
  showOtp = signal<boolean>(false);
  loginRoleDropdownOpen = signal<boolean>(false);
  signupRoleDropdownOpen = signal<boolean>(false);
  selectedLoginRole = signal('admin');
  selectedSignupRole = signal('teacher');
  loginRoles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
    { value: 'parent', label: 'Parent' }
  ];
  signupRoles = this.loginRoles.filter(role => role.value !== 'admin');

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
    this.closeRoleDropdowns();
  }

  toggleOtp() {
    this.showOtp.set(!this.showOtp());
    this.closeRoleDropdowns();
  }

  toggleLoginRoleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.signupRoleDropdownOpen.set(false);
    this.loginRoleDropdownOpen.update(open => !open);
  }

  toggleSignupRoleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.loginRoleDropdownOpen.set(false);
    this.signupRoleDropdownOpen.update(open => !open);
  }

  setLoginRole(role: string) {
    this.selectedLoginRole.set(role);
    this.loginForm.patchValue({ role });
    this.closeRoleDropdowns();
  }

  setSignupRole(role: string) {
    this.selectedSignupRole.set(role);
    this.signupForm.patchValue({ role });
    this.closeRoleDropdowns();
  }

  getRoleLabel(role: string) {
    return this.loginRoles.find(item => item.value === role)?.label ?? 'Select Role';
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

  @HostListener('document:click')
  closeRoleDropdowns() {
    this.loginRoleDropdownOpen.set(false);
    this.signupRoleDropdownOpen.set(false);
  }
}
