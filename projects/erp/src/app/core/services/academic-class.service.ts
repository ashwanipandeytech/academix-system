import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { AcademicClass } from '../models/erp.models';

@Injectable()
export class AcademicClassService extends BaseDataService<AcademicClass> {
  constructor() {
    super('academic-classes');
  }
}
