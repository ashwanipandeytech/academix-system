import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/components/data-table/data-table';
import { ColumnConfig } from '../../../core/models/erp.models';

@Component({
  selector: 'app-fee-structure',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './fee-structure.html',
  styleUrl: './fee-structure.scss',
})
export class FeeStructureComponent {
  columns: ColumnConfig[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'grade', label: 'Grade', sortable: true, type: 'text' },
    { key: 'tuitionFee', label: 'Tuition Fee', sortable: true, type: 'number' },
    { key: 'activityFee', label: 'Activity Fee', sortable: true, type: 'number' },
    { key: 'transportFee', label: 'Transport Fee', sortable: true, type: 'number' },
    { key: 'total', label: 'Total', sortable: true, type: 'number' }
  ];

  fees = [
    { id: 1, grade: 'Grade 1', tuitionFee: 5000, activityFee: 500, transportFee: 1000, total: 6500 },
    { id: 2, grade: 'Grade 2', tuitionFee: 5200, activityFee: 500, transportFee: 1000, total: 6700 },
    { id: 3, grade: 'Grade 3', tuitionFee: 5400, activityFee: 600, transportFee: 1100, total: 7100 },
    { id: 4, grade: 'Grade 4', tuitionFee: 5600, activityFee: 600, transportFee: 1100, total: 7300 },
    { id: 5, grade: 'Grade 5', tuitionFee: 6000, activityFee: 700, transportFee: 1200, total: 7900 }
  ];
}
