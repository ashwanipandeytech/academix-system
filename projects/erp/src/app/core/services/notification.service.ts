import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Notification } from '../models/erp.models';

@Injectable({ providedIn: 'root' })
export class NotificationService extends BaseDataService<Notification> {
  constructor() {
    super([]);
  }
}
