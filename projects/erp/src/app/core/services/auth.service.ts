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

    const saved = localStorage.getItem(this.userKey);
    return saved ? JSON.parse(saved) : null;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }
}
