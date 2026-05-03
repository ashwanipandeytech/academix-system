import { Injectable, signal } from '@angular/core';

export interface Transaction {
  id: string;
  student: string;
  type: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Pending';
}

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private transactions = signal<Transaction[]>([
    { id: '#INV-9021', student: 'John Doe', type: 'Tuition Fee', amount: '$1,200.00', date: 'May 10, 2026', status: 'Paid' },
    { id: '#INV-9020', student: 'Alice Smith', type: 'Library Fine', amount: '$15.00', date: 'May 09, 2026', status: 'Pending' },
    { id: '#INV-9019', student: 'Brian King', type: 'Transport Fee', amount: '$320.00', date: 'May 08, 2026', status: 'Pending' },
    { id: '#INV-9018', student: 'Maya Patel', type: 'Activity Fee', amount: '$85.00', date: 'May 07, 2026', status: 'Paid' }
  ]);

  getTransactions() {
    return this.transactions.asReadonly();
  }
}
