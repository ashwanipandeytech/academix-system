import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent {
  selectedClass = signal('All Classes');
  selectedStatus = signal('All Status');
  classOptions = ['All Classes', 'Grade 10-A', 'Grade 11-B', 'Grade 9-C'];
  statusOptions = ['All Status', 'Scheduled', 'Draft', 'Published'];

  summary = [
    { label: 'Scheduled Exams', value: 12, icon: 'bi-calendar-event', color: 'primary' },
    { label: 'Pending Results', value: 7, icon: 'bi-hourglass-split', color: 'warning' },
    { label: 'Published Results', value: 18, icon: 'bi-patch-check', color: 'success' }
  ];

  exams = [
    { name: 'Mathematics - Final', date: 'May 15', class: 'Grade 10-A', subject: 'Mathematics', time: '09:00 AM', duration: '3 hrs', status: 'Scheduled' },
    { name: 'Physics - Theory', date: 'May 18', class: 'Grade 11-B', subject: 'Physics', time: '10:30 AM', duration: '2.5 hrs', status: 'Scheduled' },
    { name: 'Chemistry - Practical', date: 'May 21', class: 'Grade 11-B', subject: 'Chemistry', time: '12:00 PM', duration: '2 hrs', status: 'Draft' },
    { name: 'English Literature', date: 'May 24', class: 'Grade 9-C', subject: 'English', time: '08:30 AM', duration: '2 hrs', status: 'Published' }
  ];

  gradeBook = [
    { className: 'Grade 10-A', subject: 'Mathematics', submitted: 42, total: 48, average: '82%' },
    { className: 'Grade 11-B', subject: 'Physics', submitted: 36, total: 40, average: '78%' },
    { className: 'Grade 9-C', subject: 'English', submitted: 44, total: 45, average: '86%' }
  ];

  filteredExams = computed(() => {
    const className = this.selectedClass();
    const status = this.selectedStatus();

    return this.exams.filter(exam =>
      (className === 'All Classes' || exam.class === className) &&
      (status === 'All Status' || exam.status === status)
    );
  });

  setClassFilter(className: string) {
    this.selectedClass.set(className);
  }

  setStatusFilter(status: string) {
    this.selectedStatus.set(status);
  }
}
