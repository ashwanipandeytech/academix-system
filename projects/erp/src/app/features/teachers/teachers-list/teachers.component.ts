import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {
  private teacherService = inject(TeacherService);
  teachers = this.teacherService.getTeachers();
  selectedDepartment = signal('All Departments');
  selectedStatus = signal('All Status');
  departmentOptions = ['All Departments', 'Mathematics', 'Science', 'English'];
  statusOptions = ['All Status', 'Online', 'Offline'];

  summary = [
    { label: 'Total Faculty', value: 84, icon: 'bi-person-badge-fill', color: 'primary' },
    { label: 'Departments', value: 12, icon: 'bi-diagram-3', color: 'success' },
    { label: 'On Leave', value: 6, icon: 'bi-calendar-x', color: 'warning' }
  ];

  filteredTeachers = computed(() => {
    const department = this.selectedDepartment();
    const status = this.selectedStatus();

    return this.teachers().filter(teacher =>
      (department === 'All Departments' || teacher.department === department) &&
      (status === 'All Status' || teacher.status === status)
    );
  });

  setDepartmentFilter(department: string) {
    this.selectedDepartment.set(department);
  }

  setStatusFilter(status: string) {
    this.selectedStatus.set(status);
  }
}
