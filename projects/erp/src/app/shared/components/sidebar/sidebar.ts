import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}

  hasAccess(menu: string): boolean {
    const role = this.authService.currentUser()?.role?.toLowerCase();
    
    // Admins and SuperAdmins see everything
    if (!role || role === 'admin' || role === 'superadmin') {
      return true;
    }

    if (role === 'student') {
      return ['dashboard', 'academic', 'exams'].includes(menu);
    }

    if (role === 'teacher') {
      return ['dashboard', 'academic', 'students', 'exams', 'communication'].includes(menu);
    }

    if (role === 'parent') {
      return ['dashboard', 'students', 'fees'].includes(menu);
    }

    return false;
  }
}
