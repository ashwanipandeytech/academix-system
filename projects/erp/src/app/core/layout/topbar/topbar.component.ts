import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  private platformId = inject(PLATFORM_ID);
  authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  theme = signal<'light' | 'dark'>(this.getSavedTheme());

  constructor() {
    effect(() => {
      if (!this.isBrowser()) {
        return;
      }

      const theme = this.theme();
      document.documentElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem('academix_theme', theme);
    });
  }

  toggleSidebar() {
    // Logic for sidebar toggle could be managed via a layout service
  }

  toggleTheme() {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  private getSavedTheme(): 'light' | 'dark' {
    if (!this.isBrowser()) {
      return 'light';
    }

    return localStorage.getItem('academix_theme') === 'dark' ? 'dark' : 'light';
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
