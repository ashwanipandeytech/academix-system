import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Notification } from '../models/erp.models';

@Injectable()
export class NotificationService extends BaseDataService<Notification> {
  constructor() {
    super('notifications');
  }
}
