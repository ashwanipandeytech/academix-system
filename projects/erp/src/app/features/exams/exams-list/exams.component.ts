import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exams.component.html'
})
export class ExamsComponent {
  exams = [
    { name: 'Mathematics - Final', date: 'May 15', class: 'Grade 10-A', status: 'Scheduled' },
    { name: 'Physics - Theory', date: 'May 18', class: 'Grade 11-B', status: 'Scheduled' }
  ];
}
