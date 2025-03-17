import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users = signal<User[]>([]);
  searchTerm = signal<string>('');
  currentPage = signal<number>(1);
  itemsPerPage = 5;
  selectedUser = signal<User | null>(null);

  private userService = inject(UserService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data:any) => {
      this.users.set(data);
    });
  }
  get paginatedUsers(): User[] {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.users().slice(start, start + this.itemsPerPage);
  }
  searchUsers(): User[] {
    if (!this.searchTerm()) {
      return this.paginatedUsers;
    }
    return this.paginatedUsers.filter(user =>
      Object.values(user).some(val => val.toString().toLowerCase().includes(this.searchTerm().toLowerCase()))
    );
  }
  selectUser(user: User): void {
    this.selectedUser.set(user);
  }
  totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.users().length / this.itemsPerPage) }, (_, i) => i + 1);
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages().length) {
      this.currentPage.set(page);
    }
  }
  logout(): void {
    this.authService.logout();
  }
  
}