import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Exam } from '../models/erp.models';

@Injectable()
export class ExamService extends BaseDataService<Exam> {
  constructor() {
    super('exams');
  }
}
