import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/components/data-table/data-table';
import { ColumnConfig } from '../../../core/models/erp.models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductListComponent {
  columns: ColumnConfig[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number' },
    { key: 'name', label: 'Name', sortable: true, type: 'text' },
    { key: 'category', label: 'Category', sortable: true, type: 'text' },
    { key: 'quantity', label: 'Quantity', sortable: true, type: 'number' },
    { key: 'price', label: 'Price', sortable: true, type: 'number' },
    { key: 'supplier', label: 'Supplier', sortable: true, type: 'text' }
  ];

  products = [
    { id: 1, name: 'Notebooks', category: 'Stationery', quantity: 500, price: 20, supplier: 'ABC Supplies' },
    { id: 2, name: 'Ballpoint Pens', category: 'Stationery', quantity: 1000, price: 5, supplier: 'Pen World' },
    { id: 3, name: 'Whiteboard Markers', category: 'Stationery', quantity: 100, price: 50, supplier: 'Marker Mart' },
    { id: 4, name: 'A4 Paper Reams', category: 'Stationery', quantity: 50, price: 300, supplier: 'Paper Co' },
    { id: 5, name: 'School Bags', category: 'Accessories', quantity: 100, price: 500, supplier: 'Bag Zone' }
  ];
}
