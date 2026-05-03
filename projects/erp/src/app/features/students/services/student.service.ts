import { Injectable, signal, computed } from '@angular/core';

export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  parent: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = signal<Student[]>([
    { id: '#STU-001', name: 'John Doe', email: 'john.doe@example.com', class: 'Grade 10-A', parent: 'Michael Doe', phone: '+1 234 567 890', status: 'Active' },
    { id: '#STU-002', name: 'Alice Smith', email: 'alice.s@example.com', class: 'Grade 9-B', parent: 'Robert Smith', phone: '+1 234 567 891', status: 'Active' },
    { id: '#STU-003', name: 'Brian King', email: 'brian.k@example.com', class: 'Grade 10-A', parent: 'Sarah King', phone: '+1 234 567 892', status: 'Pending' }
  ]);

  getStudents() {
    return this.students.asReadonly();
  }

  addStudent(student: Student) {
    this.students.update(prev => [...prev, student]);
  }
}
