import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Fee } from '../models/erp.models';

@Injectable({ providedIn: 'root' })
export class FeeService extends BaseDataService<Fee> {
  constructor() {
    super('fees');
  }
}
