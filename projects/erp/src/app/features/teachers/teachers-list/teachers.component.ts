import { Component, inject } from '@angular/core';
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
}
