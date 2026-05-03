import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/components/data-table/data-table';
import { ColumnConfig } from '../../../core/models/erp.models';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './class-list.html',
  styleUrl: './class-list.scss',
})
export class ClassListComponent {
  columns: ColumnConfig[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'className', label: 'Class Name', sortable: true, type: 'text' },
    { key: 'section', label: 'Section', sortable: true, type: 'text' },
    { key: 'teacher', label: 'Teacher', sortable: true, type: 'text' },
    { key: 'room', label: 'Room', sortable: true, type: 'text' },
    { key: 'strength', label: 'Strength', sortable: true, type: 'number' }
  ];

  classes = [
    { id: 1, className: 'Grade 1', section: 'A', teacher: 'John Doe', room: '101', strength: 30 },
    { id: 2, className: 'Grade 1', section: 'B', teacher: 'Jane Smith', room: '102', strength: 28 },
    { id: 3, className: 'Grade 2', section: 'A', teacher: 'Robert Brown', room: '201', strength: 32 },
    { id: 4, className: 'Grade 2', section: 'B', teacher: 'Emily White', room: '202', strength: 30 },
    { id: 5, className: 'Grade 3', section: 'A', teacher: 'Michael Green', room: '301', strength: 35 }
  ];
}
