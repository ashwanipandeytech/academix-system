import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/components/data-table/data-table';
import { ColumnConfig } from '../../../core/models/erp.models';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookListComponent {
  columns: ColumnConfig[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'title', label: 'Title', sortable: true, type: 'text' },
    { key: 'author', label: 'Author', sortable: true, type: 'text' },
    { key: 'isbn', label: 'ISBN', sortable: true, type: 'text' },
    { key: 'category', label: 'Category', sortable: true, type: 'text' },
    { key: 'status', label: 'Status', sortable: true, type: 'badge' }
  ];

  books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', category: 'Fiction', status: 'Available' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', category: 'Fiction', status: 'Borrowed' },
    { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0451524935', category: 'Dystopian', status: 'Available' },
    { id: 4, title: 'Brave New World', author: 'Aldous Huxley', isbn: '978-0060850524', category: 'Dystopian', status: 'Available' },
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0316769488', category: 'Fiction', status: 'Available' },
    { id: 6, title: 'Lord of the Flies', author: 'William Golding', isbn: '978-0399501487', category: 'Fiction', status: 'Available' }
  ];
}
