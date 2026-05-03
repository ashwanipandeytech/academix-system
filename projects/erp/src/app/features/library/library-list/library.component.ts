import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  selectedCategory = signal('All Categories');
  selectedAvailability = signal('Availability');
  categoryOptions = ['All Categories', 'Science', 'History', 'Computer Science', 'Literature'];
  availabilityOptions = ['Availability', 'Available', 'Out of Stock'];

  summary = [
    { label: 'Total Books', value: 1840, icon: 'bi-bookshelf', color: 'primary' },
    { label: 'Issued Books', value: 326, icon: 'bi-arrow-left-right', color: 'warning' },
    { label: 'Available Copies', value: 1514, icon: 'bi-check2-circle', color: 'success' }
  ];

  books = [
    { title: 'Quantum Mechanics', author: 'Dr. Richard Feynman', category: 'Science', isbn: '978-0201021158', shelf: 'S-12', copies: 5, available: 3 },
    { title: 'World History', author: 'J.M. Roberts', category: 'History', isbn: '978-0195210439', shelf: 'H-04', copies: 10, available: 0 },
    { title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest', category: 'Computer Science', isbn: '978-0262033848', shelf: 'CS-02', copies: 7, available: 4 },
    { title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Literature', isbn: '978-0141439518', shelf: 'L-08', copies: 12, available: 9 }
  ];

  recentIssues = [
    { student: 'John Doe', book: 'Quantum Mechanics', due: 'May 20' },
    { student: 'Alice Smith', book: 'Pride and Prejudice', due: 'May 22' },
    { student: 'Brian King', book: 'Introduction to Algorithms', due: 'May 25' }
  ];

  filteredBooks = computed(() => {
    const category = this.selectedCategory();
    const availability = this.selectedAvailability();

    return this.books.filter(book =>
      (category === 'All Categories' || book.category === category) &&
      (
        availability === 'Availability' ||
        (availability === 'Available' && book.available > 0) ||
        (availability === 'Out of Stock' && book.available === 0)
      )
    );
  });

  setCategoryFilter(category: string) {
    this.selectedCategory.set(category);
  }

  setAvailabilityFilter(availability: string) {
    this.selectedAvailability.set(availability);
  }
}
