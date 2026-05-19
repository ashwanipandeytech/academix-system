import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class LandingComponent implements OnInit {
  private meta = inject(Meta);
  private titleService = inject(Title);

  ngOnInit() {
    this.titleService.setTitle('Academix - Smart School ERP');
    this.meta.addTags([
      { name: 'description', content: 'Modern school ERP for admissions, academics, fees, attendance, exams, communication, and operations.' },
      { name: 'keywords', content: 'school erp, school management system, student management, fee management, attendance tracker' },
      { property: 'og:title', content: 'Academix - Smart School ERP' },
      { property: 'og:description', content: 'Run every school workflow from one connected ERP workspace.' }
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
  trustMetrics = [
    { value: '18+', label: 'ERP modules' },
    { value: '99.9%', label: 'Cloud uptime' },
    { value: '24/7', label: 'Role access' }
  ];

  modules = [
    { icon: 'bi-person-plus-fill', title: 'Admissions', description: 'Enquiries, applications, document checks, and admission fees in one trackable pipeline.' },
    { icon: 'bi-qr-code-scan', title: 'Attendance', description: 'QR attendance, leave records, late marks, and daily summaries for students and staff.' },
    { icon: 'bi-wallet2', title: 'Fees & Accounting', description: 'Fee collection, dues, receipts, expenses, payroll, and finance reporting.' },
    { icon: 'bi-award-fill', title: 'Exams & Results', description: 'Schedules, marks entry, report cards, grade sheets, and result publishing.' },
    { icon: 'bi-megaphone-fill', title: 'Communication', description: 'Notices, messages, reminders, parent updates, and support tickets.' },
    { icon: 'bi-box-seam-fill', title: 'Operations', description: 'Inventory, transport, hostel, library, live classes, website CMS, and audit logs.' }
  ];

  workflow = [
    { step: '01', title: 'Set up your institute', description: 'Configure branches, classes, roles, permissions, and academic sessions.' },
    { step: '02', title: 'Run daily operations', description: 'Manage admissions, attendance, fees, assignments, messages, and reports.' },
    { step: '03', title: 'Review every outcome', description: 'Track finance, academics, staff activity, support requests, and audit logs.' }
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
    { name: 'John Doe', role: 'Principal, St. Mary School', text: 'This ERP has transformed how we manage our school operations. Highly recommended!', avatar: 'https://i.pravatar.cc/100&q=50?u=john' },
    { name: 'Jane Smith', role: 'Administrator, Global Institute', text: 'The automation features saved us hundreds of hours of manual work.', avatar: 'https://i.pravatar.cc/100&q=50?u=jane' }
  ];
}
