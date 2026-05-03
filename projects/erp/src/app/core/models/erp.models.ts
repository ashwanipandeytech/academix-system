export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  classId: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  address: string;
  enrollmentDate: Date;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  subject: string;
  email: string;
  phone: string;
  joiningDate: Date;
  qualification: string;
}

export interface AcademicClass {
  id: string;
  name: string;
  section: string;
  teacherId: string;
  roomNumber: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: Date;
  status: 'Paid' | 'Pending' | 'Overdue';
  type: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  available: number;
}

export interface Exam {
  id: string;
  name: string;
  classId: string;
  subject: string;
  date: Date;
  totalMarks: number;
  passingMarks: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'Info' | 'Warning' | 'Success' | 'Error';
  timestamp: Date;
  read: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface InstitutionRegistration {
  id: string;
  institutionName: string;
  institutionType: 'school' | 'college' | 'university' | 'coaching';
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  planName: string;
  estimatedStudents: number;
  status: 'pending' | 'active' | 'cancelled';
  createdAt: any;
}

export interface ColumnConfig {
  key: string;
  label: string;
  sortable: boolean;
  type: 'text' | 'number' | 'date' | 'badge' | 'action' | 'checkbox';
}
