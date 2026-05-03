import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent {
  private financeService = inject(FinanceService);
  transactions = this.financeService.getTransactions();
  selectedStatus = signal('All Status');
  statusOptions = ['All Status', 'Paid', 'Pending'];

  summary = [
    { label: 'Collected This Month', value: '$45,200', icon: 'bi-cash-stack', color: 'success' },
    { label: 'Pending Dues', value: '$8,450', icon: 'bi-hourglass-split', color: 'warning' },
    { label: 'Scholarships', value: '$4,800', icon: 'bi-award', color: 'primary' },
    { label: 'Overdue Invoices', value: '14', icon: 'bi-exclamation-circle', color: 'danger' }
  ];

  paymentMethods = [
    { label: 'Online Transfer', amount: '$22,100', percent: 49 },
    { label: 'Card Payments', amount: '$13,700', percent: 30 },
    { label: 'Cash/Cheque', amount: '$9,400', percent: 21 }
  ];

  filteredTransactions = computed(() => {
    const status = this.selectedStatus();
    return this.transactions().filter(tx => status === 'All Status' || tx.status === status);
  });

  setStatusFilter(status: string) {
    this.selectedStatus.set(status);
  }
}
