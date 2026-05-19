import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export interface User {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private userKey = 'academix_user';
  currentUser = signal<User | null>(this.getSavedUser());

  login(user: User) {
    if (this.isBrowser()) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    this.currentUser.set(user);
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.userKey);
    }

    this.currentUser.set(null);
  }

  private getSavedUser(): User | null {
    if (!this.isBrowser()) {
      return null;
    }

    try {
      const saved = localStorage.getItem(this.userKey);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error parsing saved user from localStorage', e);
      localStorage.removeItem(this.userKey);
      return null;
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  resetPassword(email: string) {
    console.log('Resetting password for:', email);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Password reset link sent to your email.' });
      }, 1500);
    });
  }
}
