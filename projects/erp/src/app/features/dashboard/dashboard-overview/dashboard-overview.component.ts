import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <h3 class="fw-bold mb-0">Overview</h3>
      <p class="text-muted">Welcome to your school dashboard</p>
      
      <div class="row g-4 mt-2">
        <div class="col-md-3" *ngFor="let stat of stats">
          <div class="card border-0 shadow-sm p-3">
            <p class="text-muted small mb-1">{{stat.label}}</p>
            <h3 class="fw-bold mb-0">{{stat.value}}</h3>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardOverviewComponent {
  stats = [
    { label: 'Total Students', value: '1,284' },
    { label: 'Total Teachers', value: '84' },
    { label: 'Revenue', value: '$45,200' },
    { label: 'Active Exams', value: '12' }
  ];
}
