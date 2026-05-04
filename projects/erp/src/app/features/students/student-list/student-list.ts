import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/components/data-table/data-table';
import { StudentService } from '../../../core/services/student.service';
import { ColumnConfig, Student } from '../../../core/models/erp.models';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss'
})
export class StudentListComponent {
  private studentService = inject(StudentService);
  students$ = this.studentService.getAll();

  columns: ColumnConfig[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'text' },
    { key: 'firstName', label: 'First Name', sortable: true, type: 'text' },
    { key: 'lastName', label: 'Last Name', sortable: true, type: 'text' },
    { key: 'rollNumber', label: 'Roll No', sortable: true, type: 'text' },
    { key: 'classId', label: 'Class', sortable: true, type: 'text' },
    { key: 'email', label: 'Email', sortable: true, type: 'text' }
  ];

  onAction(event: { action: string, item: any }) {
    const { action, item } = event;
    if (action === 'add') {
      this.onAdd();
    } else if (action === 'edit') {
      this.onEdit(item);
    } else if (action === 'delete') {
      this.onDelete(item);
    } else if (action === 'view') {
      console.log('Viewing student:', item);
    }
  }

  onAdd() {
    console.log('Opening add student modal');
    // Implementation for ModalService would go here
  }

  onEdit(student: Student) {
    console.log('Editing student:', student);
  }

  onDelete(student: Student) {
    if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      this.studentService.delete(student.id);
    }
  }
}
