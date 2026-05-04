import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColumnConfig } from '../../../core/models/erp.models';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss'
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() columns: ColumnConfig[] = [];
  @Input() data: any[] = [];
  
  @Output() actionClicked = new EventEmitter<{ action: string, item: any }>();

  filteredData: any[] = [];
  searchTerm: string = '';
  selectedItems: Set<any> = new Set();
  isAllSelected: boolean = false;

  ngOnInit() {
    this.filteredData = [...this.data];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.applyFilter();
    }
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredData = [...this.data];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredData = this.data.filter(item => 
        Object.values(item).some(val => 
          val && val.toString().toLowerCase().includes(term)
        )
      );
    }
    this.updateSelectionState();
  }

  toggleAll(event: any) {
    this.isAllSelected = event.target.checked;
    if (this.isAllSelected) {
      this.filteredData.forEach(item => this.selectedItems.add(item));
    } else {
      this.selectedItems.clear();
    }
  }

  toggleItem(item: any, event: any) {
    if (event.target.checked) {
      this.selectedItems.add(item);
    } else {
      this.selectedItems.delete(item);
    }
    this.updateSelectionState();
  }

  private updateSelectionState() {
    this.isAllSelected = this.filteredData.length > 0 && 
                         this.filteredData.every(item => this.selectedItems.has(item));
  }

  onAction(action: string, item: any) {
    this.actionClicked.emit({ action, item });
  }
}
