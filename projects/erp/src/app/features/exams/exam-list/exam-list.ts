import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/components/data-table/data-table';
import { ColumnConfig } from '../../../core/models/erp.models';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './exam-list.html',
  styleUrl: './exam-list.scss',
})
export class ExamListComponent {
  columns: ColumnConfig[] = [
    { key: 'name', label: 'Name', sortable: true, type: 'text' },
    { key: 'class', label: 'Class', sortable: true, type: 'text' },
    { key: 'date', label: 'Date', sortable: true, type: 'date' },
    { key: 'status', label: 'Status', sortable: true, type: 'badge' }
  ];

  exams = [
    { name: 'Midterm Examination', class: 'Grade 10', date: '2023-10-15', status: 'Upcoming' },
    { name: 'Final Examination', class: 'Grade 12', date: '2023-12-05', status: 'Scheduled' },
    { name: 'Unit Test 1', class: 'Grade 9', date: '2023-09-20', status: 'Completed' },
    { name: 'Monthly Assessment', class: 'Grade 8', date: '2023-09-25', status: 'In Progress' },
    { name: 'Mock Exam', class: 'Grade 11', date: '2023-11-10', status: 'Pending' },
    { name: 'Practical Exam', class: 'Grade 10', date: '2023-10-20', status: 'Scheduled' },
  ];
}
