import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { InstitutionRegistration } from '../models/erp.models';

@Injectable()
export class RegistrationService extends BaseDataService<InstitutionRegistration> {
  constructor() {
    super('registrations');
  }
}
