import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Product } from '../models/erp.models';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseDataService<Product> {
  constructor() {
    super('products');
  }
}
