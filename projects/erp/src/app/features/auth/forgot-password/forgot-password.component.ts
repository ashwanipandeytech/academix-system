import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  forgotForm: FormGroup;
  isSubmitting = signal(false);
  isSuccess = signal(false);

  constructor() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    if (this.forgotForm.valid) {
      this.isSubmitting.set(true);
      try {
        const response: any = await this.authService.resetPassword(this.forgotForm.value.email);
        if (response.success) {
          this.isSuccess.set(true);
          this.toastService.success(response.message);
        }
      } catch (error) {
        this.toastService.error('Something went wrong. Please try again later.');
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }
}
