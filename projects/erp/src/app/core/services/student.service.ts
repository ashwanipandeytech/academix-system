import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Student } from '../models/erp.models';

@Injectable()
export class StudentService extends BaseDataService<Student> {
  constructor() {
    super('students');
  }
}
