import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  onQuickLogin(role: string) {
    this.authService.login({
      name: `Demo ${role}`,
      email: `${role.toLowerCase()}@example.com`,
      role: role
    });
    this.router.navigate(['/erp/dashboard']);
  }
}
