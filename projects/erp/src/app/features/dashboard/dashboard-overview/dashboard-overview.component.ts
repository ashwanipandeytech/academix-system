import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent {
  stats = [
    { label: 'Total Students', value: '1,284', trend: '+12%', icon: 'bi-people-fill', color: 'primary' },
    { label: 'Total Teachers', value: '84', trend: '+4%', icon: 'bi-person-badge-fill', color: 'success' },
    { label: 'Monthly Revenue', value: '$45,200', trend: '+18%', icon: 'bi-wallet2', color: 'warning' },
    { label: 'Active Exams', value: '12', trend: '3 this week', icon: 'bi-journal-text', color: 'danger' }
  ];

  attendance = [
    { label: 'Present', value: 86 },
    { label: 'Late', value: 9 },
    { label: 'Absent', value: 5 }
  ];

  activities = [
    { title: 'New admission completed', detail: 'Aarav Sharma joined Grade 9-B', time: '10 min ago', icon: 'bi-person-plus' },
    { title: 'Fee payment received', detail: '#INV-9021 was marked as paid', time: '38 min ago', icon: 'bi-credit-card' },
    { title: 'Exam schedule updated', detail: 'Physics theory moved to May 18', time: '1 hr ago', icon: 'bi-calendar-check' }
  ];

  upcomingClasses = [
    { subject: 'Mathematics', className: 'Grade 10-A', room: 'Room 204', time: '09:30 AM' },
    { subject: 'Physics Lab', className: 'Grade 11-B', room: 'Lab 2', time: '11:00 AM' },
    { subject: 'World History', className: 'Grade 9-C', room: 'Room 110', time: '01:30 PM' }
  ];
}
