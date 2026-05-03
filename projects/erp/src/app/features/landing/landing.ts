import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class LandingComponent implements OnInit {
  private meta = inject(Meta);
  private titleService = inject(Title);

  ngOnInit() {
    this.titleService.setTitle('EduERP - Smart School Management System');
    this.meta.addTags([
      { name: 'description', content: 'Comprehensive School Management System for modern educational institutions. Manage students, fees, attendance, and more with ease.' },
      { name: 'keywords', content: 'school erp, school management system, student management, fee management, attendance tracker' },
      { property: 'og:title', content: 'EduERP - Smart School Management System' },
      { property: 'og:description', content: 'Transform your school operations with our smart ERP solution.' }
    ]);

    this.initScrollAnimations();
  }

  private initScrollAnimations() {
    if (typeof window === 'undefined') return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe all elements with reveal classes
    setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      revealElements.forEach(el => observer.observe(el));
    }, 100);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });
  }
  features = [
    { icon: 'bi-person-badge', title: 'Student Management', description: 'Streamline admissions, profiles, and student records efficiently.' },
    { icon: 'bi-cash-coin', title: 'Fee Management', description: 'Automate fee collection, invoicing, and financial reporting.' },
    { icon: 'bi-calendar-check', title: 'Attendance', description: 'Track student and staff attendance with real-time updates.' },
    { icon: 'bi-graph-up-arrow', title: 'Reports', description: 'Generate comprehensive academic and administrative reports.' },
    { icon: 'bi-people', title: 'Staff Management', description: 'Manage payroll, leave, and performance of all staff members.' },
    { icon: 'bi-chat-dots', title: 'Communication', description: 'Seamlessly connect teachers, students, and parents.' }
  ];

  pricingPlans = [
    {
      name: 'Basic',
      price: '$99',
      period: 'per month',
      features: ['Up to 100 Students', 'Basic Reporting', 'Email Support', 'Student Management'],
      cta: 'Choose Plan',
      recommended: false
    },
    {
      name: 'Standard',
      price: '$199',
      period: 'per month',
      features: ['Up to 500 Students', 'Advanced Reporting', 'Priority Support', 'Fee & Attendance'],
      cta: 'Choose Plan',
      recommended: true
    },
    {
      name: 'Premium',
      price: '$399',
      period: 'per month',
      features: ['Unlimited Students', 'Custom Dashboards', '24/7 Phone Support', 'Full ERP Suite'],
      cta: 'Choose Plan',
      recommended: false
    }
  ];

  testimonials = [
    { name: 'John Doe', role: 'Principal, St. Mary School', text: 'This ERP has transformed how we manage our school operations. Highly recommended!', avatar: 'https://i.pravatar.cc/150?u=john' },
    { name: 'Jane Smith', role: 'Administrator, Global Institute', text: 'The automation features saved us hundreds of hours of manual work.', avatar: 'https://i.pravatar.cc/150?u=jane' }
  ];
}
