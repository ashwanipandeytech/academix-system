import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.component.html'
})
export class LibraryComponent {
  books = [
    { title: 'Quantum Mechanics', author: 'Dr. Richard Feynman', category: 'Science', copies: 5, available: 3 },
    { title: 'World History', author: 'J.M. Roberts', category: 'History', copies: 10, available: 0 }
  ];
}
