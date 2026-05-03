import { Injectable, signal } from '@angular/core';

export interface Teacher {
  id: number;
  name: string;
  department: string;
  subject: string;
  email: string;
  phone: string;
  experience: string;
  classes: number;
  avatar: string;
  status: 'Online' | 'Offline';
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teachers = signal<Teacher[]>([
    { id: 1, name: 'Prof. Sarah Wilson', department: 'Mathematics', subject: 'Algebra', email: 'sarah.w@example.com', phone: '+1 234 567 890', experience: '12 Years', classes: 5, avatar: 'https://i.pravatar.cc/150?u=1', status: 'Online' },
    { id: 2, name: 'Dr. James Miller', department: 'Science', subject: 'Physics', email: 'james.m@example.com', phone: '+1 234 567 891', experience: '8 Years', classes: 4, avatar: 'https://i.pravatar.cc/150?u=2', status: 'Online' },
    { id: 3, name: 'Ms. Olivia Brown', department: 'English', subject: 'Literature', email: 'olivia.b@example.com', phone: '+1 234 567 892', experience: '6 Years', classes: 3, avatar: 'https://i.pravatar.cc/150?u=3', status: 'Offline' }
  ]);

  getTeachers() {
    return this.teachers.asReadonly();
  }
}
