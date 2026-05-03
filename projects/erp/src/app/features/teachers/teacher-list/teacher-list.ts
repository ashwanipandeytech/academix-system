import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/components/data-table/data-table';
import { ColumnConfig } from '../../../core/models/erp.models';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './teacher-list.html',
  styleUrl: './teacher-list.scss',
})
export class TeacherListComponent {
  columns: ColumnConfig[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'text' },
    { key: 'name', label: 'Name', sortable: true, type: 'text' },
    { key: 'subject', label: 'Subject', sortable: true, type: 'text' },
    { key: 'email', label: 'Email', sortable: true, type: 'text' },
    { key: 'phone', label: 'Phone', sortable: true, type: 'text' },
    { key: 'status', label: 'Status', sortable: true, type: 'badge' }
  ];

  teachers = [
    { id: 'T001', name: 'John Doe', subject: 'Mathematics', email: 'john.doe@example.com', phone: '123-456-7890', status: 'Active' },
    { id: 'T002', name: 'Jane Smith', subject: 'Science', email: 'jane.smith@example.com', phone: '234-567-8901', status: 'Active' },
    { id: 'T003', name: 'Michael Brown', subject: 'History', email: 'michael.b@example.com', phone: '345-678-9012', status: 'On Leave' },
    { id: 'T004', name: 'Emily Wilson', subject: 'English', email: 'emily.w@example.com', phone: '456-789-0123', status: 'Active' },
    { id: 'T005', name: 'Robert Taylor', subject: 'Physics', email: 'robert.t@example.com', phone: '567-890-1234', status: 'Active' },
    { id: 'T006', name: 'Sarah Miller', subject: 'Chemistry', email: 'sarah.m@example.com', phone: '678-901-2345', status: 'Active' },
  ];
}
