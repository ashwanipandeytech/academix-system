import { Injectable, signal } from '@angular/core';

export interface User {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'academix_user';
  currentUser = signal<User | null>(this.getSavedUser());

  login(user: User) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
  }

  private getSavedUser(): User | null {
    const saved = localStorage.getItem(this.userKey);
    return saved ? JSON.parse(saved) : null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }
}
