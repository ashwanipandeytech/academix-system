import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Book } from '../models/erp.models';

@Injectable()
export class BookService extends BaseDataService<Book> {
  constructor() {
    super('books');
  }
}
