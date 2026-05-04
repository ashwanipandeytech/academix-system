import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
  title?: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(toast: Toast) {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    if (toast.delay !== 0) {
      setTimeout(() => this.remove(toast), toast.delay || 5000);
    }
  }

  remove(toast: Toast) {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t !== toast));
  }

  success(message: string, title?: string) {
    this.show({ message, title, type: 'success' });
  }

  error(message: string, title?: string) {
    this.show({ message, title, type: 'danger' });
  }

  info(message: string, title?: string) {
    this.show({ message, title, type: 'info' });
  }

  warning(message: string, title?: string) {
    this.show({ message, title, type: 'warning' });
  }
}
