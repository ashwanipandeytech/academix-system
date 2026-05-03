import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Exam } from '../models/erp.models';

@Injectable({ providedIn: 'root' })
export class ExamService extends BaseDataService<Exam> {
  constructor() {
    super([]);
  }
}
