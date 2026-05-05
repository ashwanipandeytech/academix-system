import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../../core/services/registration.service';
import { InstitutionRegistration } from '../../../core/models/erp.models';
import { serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-plan-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './plan-registration.html',
  styleUrl: './plan-registration.scss'
})
export class PlanRegistrationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private registrationService = inject(RegistrationService);

  registrationForm!: FormGroup;
  selectedPlan: string = '';
  isSubmitting: boolean = false;
  isSuccess: boolean = false;

  ngOnInit() {
    this.selectedPlan = this.route.snapshot.params['planName'] || 'Standard';
    this.initForm();
  }

  private initForm() {
    this.registrationForm = this.fb.group({
      institutionName: ['', [Validators.required, Validators.minLength(3)]],
      institutionType: ['school', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      website: [''],
      estimatedStudents: [100, [Validators.required, Validators.min(1)]],
      planName: [this.selectedPlan, Validators.required]
    });
  }

  errorMessage: string = '';

  async onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    
    try {
      const formData = this.registrationForm.value;
      const registration: InstitutionRegistration = {
        ...formData,
        id: '', // Firestore auto-gen
        status: 'pending',
        createdAt: serverTimestamp()
      };

      // Add a 10-second timeout to prevent infinite loader if network is slow or Firestore is unreachable
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('TIMEOUT')), 10000)
      );

      await Promise.race([
        this.registrationService.create(registration),
        timeout
      ]);

      this.isSuccess = true;
      
      // Auto-redirect after 3 seconds for better UX
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);

    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message === 'TIMEOUT') {
        this.errorMessage = 'Connection timeout. Please check your internet and try again.';
      } else {
        this.errorMessage = 'We couldn\'t save your details. Please ensure your Firebase config is valid.';
      }
    } finally {
      this.isSubmitting = false;
    }
  }
}
