import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal<boolean>(!!localStorage.getItem('user'));

  private router = inject(Router);

  login(username: string): boolean {
    if (username.trim()) {
      localStorage.setItem('user', username);
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); 
  }
}
