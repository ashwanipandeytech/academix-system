import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Teacher } from '../models/erp.models';

@Injectable({ providedIn: 'root' })
export class TeacherService extends BaseDataService<Teacher> {
  constructor() {
    super([]);
  }
}
