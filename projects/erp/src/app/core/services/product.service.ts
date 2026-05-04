import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { Product } from '../models/erp.models';

@Injectable()
export class ProductService extends BaseDataService<Product> {
  constructor() {
    super('products');
  }
}
