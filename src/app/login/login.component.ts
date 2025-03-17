import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = signal<string>('');

  private authService = inject(AuthService);
  private router = inject(Router);

  login(): void {
    if (this.authService.login(this.username())) {
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 100);
    } else {
      alert('Enter a valid username!');
    }
  }
}
