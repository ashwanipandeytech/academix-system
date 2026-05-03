import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  private studentService = inject(StudentService);
  
  students = this.studentService.getStudents();
  searchQuery = signal('');
  selectedClass = signal('All Classes');
  classOptions = ['All Classes', 'Grade 10-A', 'Grade 9-B', 'Grade 8-C', 'Grade 11-B'];

  summary = [
    { label: 'Total Students', value: 1284, icon: 'bi-people-fill', color: 'primary' },
    { label: 'New Admissions', value: 42, icon: 'bi-person-plus', color: 'success' },
    { label: 'Pending Review', value: 18, icon: 'bi-hourglass-split', color: 'warning' }
  ];
  
  filteredStudents = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const className = this.selectedClass();
    return this.students().filter(s => 
      (className === 'All Classes' || s.class === className) &&
      (
        s.name.toLowerCase().includes(query) ||
        s.id.toLowerCase().includes(query)
      )
    );
  });

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  setClassFilter(className: string) {
    this.selectedClass.set(className);
  }
}
