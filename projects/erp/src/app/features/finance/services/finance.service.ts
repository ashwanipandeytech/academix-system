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
    { id: '#INV-9020', student: 'Alice Smith', type: 'Library Fine', amount: '$15.00', date: 'May 09, 2026', status: 'Pending' }
  ]);

  getTransactions() {
    return this.transactions.asReadonly();
  }
}
