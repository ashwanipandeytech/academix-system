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
  
  filteredStudents = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.students().filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.id.toLowerCase().includes(query)
    );
  });

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }
}
