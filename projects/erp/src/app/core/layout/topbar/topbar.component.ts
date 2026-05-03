import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  toggleSidebar() {
    // Logic for sidebar toggle could be managed via a layout service
  }
}
