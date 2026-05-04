import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Fee } from '../models/erp.models';

@Injectable()
export class FeeService extends BaseDataService<Fee> {
  constructor() {
    super('fees');
  }
}
