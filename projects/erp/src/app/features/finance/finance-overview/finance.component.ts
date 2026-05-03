import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance.component.html'
})
export class FinanceComponent {
  private financeService = inject(FinanceService);
  transactions = this.financeService.getTransactions();
}
