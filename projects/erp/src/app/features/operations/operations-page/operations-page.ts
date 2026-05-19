import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

interface PageStat {
  label: string;
  value: string;
  trend: string;
  icon: string;
  tone: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

interface PageRecord {
  title: string;
  meta: string;
  owner: string;
  status: string;
  statusTone: 'success' | 'warning' | 'danger' | 'info' | 'primary';
  value: string;
}

interface PageConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  action: string;
  icon: string;
  stats: PageStat[];
  records: PageRecord[];
  pipeline: { label: string; value: number; tone: string }[];
  quickActions: string[];
}

const PAGE_CONFIGS: Record<string, PageConfig> = {
  admissions: {
    eyebrow: 'Reception',
    title: 'Admissions',
    subtitle: 'Track enquiries, applications, document checks, and admission payments.',
    action: 'New Application',
    icon: 'bi-person-plus-fill',
    stats: [
      { label: 'New Enquiries', value: '42', trend: '+12 this week', icon: 'bi-chat-left-text', tone: 'primary' },
      { label: 'Applications', value: '118', trend: '31 pending review', icon: 'bi-file-earmark-text', tone: 'success' },
      { label: 'Interviews', value: '16', trend: 'Today', icon: 'bi-calendar2-check', tone: 'warning' },
      { label: 'Converted', value: '64%', trend: '+8%', icon: 'bi-graph-up-arrow', tone: 'info' }
    ],
    records: [
      { title: 'Aarav Sharma', meta: 'Grade 9 admission request', owner: 'Neha Sharma', status: 'Interview', statusTone: 'warning', value: 'May 20' },
      { title: 'Maya Patel', meta: 'Documents verified', owner: 'Ravi Patel', status: 'Approved', statusTone: 'success', value: 'Paid' },
      { title: 'Brian King', meta: 'Online form incomplete', owner: 'Sarah King', status: 'Follow up', statusTone: 'info', value: '2 docs' }
    ],
    pipeline: [
      { label: 'Enquiry', value: 82, tone: 'primary' },
      { label: 'Application', value: 64, tone: 'success' },
      { label: 'Interview', value: 38, tone: 'warning' }
    ],
    quickActions: ['Online admission form', 'Document checklist', 'Admission payment', 'Counsellor follow-up']
  },
  attendance: {
    eyebrow: 'QR Attendance',
    title: 'Attendance',
    subtitle: 'Monitor daily attendance, late marks, leave requests, and QR scan coverage.',
    action: 'Scan QR',
    icon: 'bi-qr-code-scan',
    stats: [
      { label: 'Present Today', value: '91%', trend: '+3%', icon: 'bi-person-check', tone: 'success' },
      { label: 'Late Marks', value: '27', trend: '-5 from yesterday', icon: 'bi-clock-history', tone: 'warning' },
      { label: 'On Leave', value: '18', trend: 'Approved', icon: 'bi-calendar-x', tone: 'info' },
      { label: 'Unmarked', value: '6', trend: 'Needs action', icon: 'bi-exclamation-triangle', tone: 'danger' }
    ],
    records: [
      { title: 'Grade 10-A', meta: '48 of 50 marked', owner: 'Ms. Wilson', status: 'Live', statusTone: 'success', value: '96%' },
      { title: 'Grade 9-C', meta: '3 students unmarked', owner: 'Mr. Brown', status: 'Review', statusTone: 'warning', value: '89%' },
      { title: 'Staff Attendance', meta: '82 of 84 marked', owner: 'Admin Office', status: 'Synced', statusTone: 'primary', value: '98%' }
    ],
    pipeline: [
      { label: 'Students', value: 91, tone: 'success' },
      { label: 'Teachers', value: 98, tone: 'primary' },
      { label: 'Staff', value: 94, tone: 'info' }
    ],
    quickActions: ['QR scan mode', 'Manual attendance', 'Leave approvals', 'Daily attendance report']
  },
  subscriptions: {
    eyebrow: 'SaaS',
    title: 'Subscriptions',
    subtitle: 'Manage school plans, student limits, renewals, trial accounts, and invoices.',
    action: 'Create Plan',
    icon: 'bi-gem',
    stats: [
      { label: 'Active Schools', value: '38', trend: '+4 this month', icon: 'bi-buildings', tone: 'primary' },
      { label: 'Monthly Revenue', value: '$24.8k', trend: '+18%', icon: 'bi-cash-stack', tone: 'success' },
      { label: 'Trials', value: '9', trend: '4 expiring soon', icon: 'bi-hourglass-split', tone: 'warning' },
      { label: 'Renewals Due', value: '7', trend: 'Next 14 days', icon: 'bi-arrow-repeat', tone: 'info' }
    ],
    records: [
      { title: 'Cambrian School and College', meta: 'Gold plan - 300 students', owner: 'Admin', status: 'Active', statusTone: 'success', value: '$150/y' },
      { title: 'Oxford International', meta: 'Premium plan - 1000 students', owner: 'SuperAdmin', status: 'Paid', statusTone: 'primary', value: '$450' },
      { title: 'Green Valley School', meta: 'Free trial - 10 students', owner: 'Sales', status: 'Trial', statusTone: 'warning', value: '5 days' }
    ],
    pipeline: [
      { label: 'Free Trial', value: 22, tone: 'warning' },
      { label: 'Gold', value: 58, tone: 'primary' },
      { label: 'Premium', value: 74, tone: 'success' }
    ],
    quickActions: ['Plan builder', 'Renew subscription', 'Approve school request', 'Payment receipt']
  },
  accounting: {
    eyebrow: 'Finance',
    title: 'Office Accounting',
    subtitle: 'Bring fee collection, expenses, payroll, deposits, and receipts together.',
    action: 'Add Voucher',
    icon: 'bi-bank2',
    stats: [
      { label: 'Fee Collected', value: '$45.2k', trend: '+18%', icon: 'bi-wallet2', tone: 'success' },
      { label: 'Expenses', value: '$12.4k', trend: 'This month', icon: 'bi-receipt', tone: 'warning' },
      { label: 'Payroll Due', value: '$18.9k', trend: 'May cycle', icon: 'bi-person-vcard', tone: 'primary' },
      { label: 'Pending Dues', value: '$8.4k', trend: '14 invoices', icon: 'bi-exclamation-circle', tone: 'danger' }
    ],
    records: [
      { title: 'Tuition Fee Batch', meta: 'Auto-linked from student fees', owner: 'Accounts', status: 'Posted', statusTone: 'success', value: '$22,100' },
      { title: 'Transport Maintenance', meta: 'Bus route 04 service bill', owner: 'Transport', status: 'Pending', statusTone: 'warning', value: '$920' },
      { title: 'Teacher Payroll', meta: 'May salary sheet', owner: 'HR', status: 'Draft', statusTone: 'info', value: '$18,900' }
    ],
    pipeline: [
      { label: 'Income', value: 76, tone: 'success' },
      { label: 'Expense', value: 42, tone: 'warning' },
      { label: 'Dues', value: 28, tone: 'danger' }
    ],
    quickActions: ['Collect fees', 'Add expense', 'Payroll sheet', 'Finance report']
  },
  academic: {
    eyebrow: 'Academics',
    title: 'Classes & Timetable',
    subtitle: 'Organize classes, sections, subjects, timetable slots, and teacher allocation.',
    action: 'Add Class',
    icon: 'bi-diagram-3-fill',
    stats: [
      { label: 'Classes', value: '32', trend: '8 grades', icon: 'bi-grid-3x3-gap', tone: 'primary' },
      { label: 'Subjects', value: '74', trend: '12 departments', icon: 'bi-journal-bookmark', tone: 'success' },
      { label: 'Timetable Gaps', value: '5', trend: 'Resolve today', icon: 'bi-calendar-range', tone: 'warning' },
      { label: 'Room Usage', value: '88%', trend: 'Optimized', icon: 'bi-door-open', tone: 'info' }
    ],
    records: [
      { title: 'Grade 10-A', meta: 'Class teacher: Sarah Wilson', owner: 'Room 204', status: 'Active', statusTone: 'success', value: '48 students' },
      { title: 'Grade 11-B', meta: 'Science stream', owner: 'Lab Block', status: 'Lab Day', statusTone: 'primary', value: '40 students' },
      { title: 'Grade 9-C', meta: 'English enrichment', owner: 'Room 110', status: 'Review', statusTone: 'warning', value: '45 students' }
    ],
    pipeline: [
      { label: 'Timetable', value: 86, tone: 'primary' },
      { label: 'Syllabus', value: 72, tone: 'success' },
      { label: 'Assessments', value: 54, tone: 'warning' }
    ],
    quickActions: ['Create timetable', 'Assign subject', 'Promote students', 'Class report']
  },
  inventory: {
    eyebrow: 'Stock',
    title: 'Inventory',
    subtitle: 'Track purchases, issues, stock alerts, suppliers, and school assets.',
    action: 'New Purchase',
    icon: 'bi-box-seam-fill',
    stats: [
      { label: 'Stock Items', value: '1,420', trend: '+80 received', icon: 'bi-boxes', tone: 'primary' },
      { label: 'Low Stock', value: '14', trend: 'Needs reorder', icon: 'bi-exclamation-diamond', tone: 'warning' },
      { label: 'Issued Today', value: '96', trend: 'Stationery', icon: 'bi-arrow-left-right', tone: 'info' },
      { label: 'Asset Value', value: '$68k', trend: '+6%', icon: 'bi-clipboard-data', tone: 'success' }
    ],
    records: [
      { title: 'A4 Paper Reams', meta: 'Stationery store', owner: 'Paper Co', status: 'Low Stock', statusTone: 'warning', value: '50 units' },
      { title: 'Lab Microscope', meta: 'Science lab asset', owner: 'Lab 2', status: 'Active', statusTone: 'success', value: '18 units' },
      { title: 'Sports Kits', meta: 'Annual sports purchase', owner: 'Sports Dept', status: 'Ordered', statusTone: 'info', value: '$1,260' }
    ],
    pipeline: [
      { label: 'Available', value: 78, tone: 'success' },
      { label: 'Issued', value: 44, tone: 'primary' },
      { label: 'Low Stock', value: 18, tone: 'warning' }
    ],
    quickActions: ['Purchase bill', 'Issue item', 'Supplier list', 'Stock report']
  },
  communication: {
    eyebrow: 'Messaging',
    title: 'Communication',
    subtitle: 'Send notices, bulk SMS, email campaigns, reminders, and parent updates.',
    action: 'Compose',
    icon: 'bi-megaphone-fill',
    stats: [
      { label: 'Messages Sent', value: '3,482', trend: 'This month', icon: 'bi-send-check', tone: 'primary' },
      { label: 'Delivery Rate', value: '97%', trend: '+2%', icon: 'bi-check2-circle', tone: 'success' },
      { label: 'Scheduled', value: '11', trend: 'Next 7 days', icon: 'bi-calendar2-week', tone: 'warning' },
      { label: 'Unread Replies', value: '24', trend: 'Needs response', icon: 'bi-chat-dots', tone: 'info' }
    ],
    records: [
      { title: 'Fee Reminder', meta: 'Parents of pending invoices', owner: 'Accounts', status: 'Scheduled', statusTone: 'warning', value: '420 recipients' },
      { title: 'Exam Timetable', meta: 'Grade 9-12 students', owner: 'Exam Cell', status: 'Sent', statusTone: 'success', value: '712 recipients' },
      { title: 'Holiday Notice', meta: 'All users', owner: 'Principal', status: 'Draft', statusTone: 'info', value: 'All roles' }
    ],
    pipeline: [
      { label: 'SMS', value: 68, tone: 'primary' },
      { label: 'Email', value: 91, tone: 'success' },
      { label: 'App Notice', value: 84, tone: 'info' }
    ],
    quickActions: ['Bulk SMS', 'Email template', 'Notice board', 'Message report']
  },
  transport: {
    eyebrow: 'Transport',
    title: 'Routes & Vehicles',
    subtitle: 'Manage routes, stops, vehicles, drivers, fee mapping, and route reports.',
    action: 'Add Route',
    icon: 'bi-bus-front-fill',
    stats: [
      { label: 'Active Routes', value: '18', trend: '42 stops', icon: 'bi-signpost-split', tone: 'primary' },
      { label: 'Students Assigned', value: '612', trend: '+21', icon: 'bi-people', tone: 'success' },
      { label: 'Vehicles', value: '24', trend: '2 in service', icon: 'bi-truck', tone: 'info' },
      { label: 'Delayed Trips', value: '3', trend: 'Morning shift', icon: 'bi-clock', tone: 'warning' }
    ],
    records: [
      { title: 'Route 04 - North Avenue', meta: '12 stops, 48 students', owner: 'Driver: Kumar', status: 'On Time', statusTone: 'success', value: '07:20 AM' },
      { title: 'Route 09 - Lake Road', meta: '8 stops, 36 students', owner: 'Driver: Ali', status: 'Delayed', statusTone: 'warning', value: '+12 min' },
      { title: 'Vehicle BUS-12', meta: 'Maintenance due', owner: 'Garage', status: 'Service', statusTone: 'info', value: 'May 22' }
    ],
    pipeline: [
      { label: 'Route Usage', value: 81, tone: 'primary' },
      { label: 'Fee Linked', value: 74, tone: 'success' },
      { label: 'Maintenance', value: 22, tone: 'warning' }
    ],
    quickActions: ['Route map', 'Assign student', 'Vehicle log', 'Transport fee']
  },
  hostel: {
    eyebrow: 'Residential',
    title: 'Hostel',
    subtitle: 'Track rooms, beds, wardens, student allocation, meals, and hostel fees.',
    action: 'Assign Room',
    icon: 'bi-house-heart-fill',
    stats: [
      { label: 'Rooms', value: '86', trend: '6 blocks', icon: 'bi-door-closed', tone: 'primary' },
      { label: 'Occupancy', value: '78%', trend: '+4%', icon: 'bi-person-hearts', tone: 'success' },
      { label: 'Vacant Beds', value: '42', trend: 'Available', icon: 'bi-layout-sidebar', tone: 'info' },
      { label: 'Requests', value: '13', trend: 'Pending', icon: 'bi-inbox', tone: 'warning' }
    ],
    records: [
      { title: 'Block A - Room 204', meta: '4 bed room, 3 occupied', owner: 'Warden: Priya', status: 'Vacancy', statusTone: 'success', value: '1 bed' },
      { title: 'Meal Plan Review', meta: 'North hostel mess', owner: 'Admin Office', status: 'Review', statusTone: 'warning', value: 'May' },
      { title: 'Hostel Fee Batch', meta: 'June billing cycle', owner: 'Accounts', status: 'Draft', statusTone: 'info', value: '$6,800' }
    ],
    pipeline: [
      { label: 'Occupancy', value: 78, tone: 'success' },
      { label: 'Fee Paid', value: 66, tone: 'primary' },
      { label: 'Requests', value: 24, tone: 'warning' }
    ],
    quickActions: ['Room allocation', 'Warden list', 'Meal plan', 'Hostel report']
  },
  'live-classes': {
    eyebrow: 'Online Learning',
    title: 'Live Classes',
    subtitle: 'Schedule Zoom, Meet, and virtual classroom sessions for students and teachers.',
    action: 'Schedule Class',
    icon: 'bi-camera-video-fill',
    stats: [
      { label: 'Today Sessions', value: '14', trend: '6 completed', icon: 'bi-camera-video', tone: 'primary' },
      { label: 'Attendance', value: '88%', trend: '+5%', icon: 'bi-person-video3', tone: 'success' },
      { label: 'Recordings', value: '128', trend: 'Cloud library', icon: 'bi-cloud-check', tone: 'info' },
      { label: 'Conflicts', value: '2', trend: 'Resolve', icon: 'bi-exclamation-triangle', tone: 'warning' }
    ],
    records: [
      { title: 'Physics Revision', meta: 'Grade 11-B', owner: 'Dr. Miller', status: 'Live', statusTone: 'success', value: '10:30 AM' },
      { title: 'Math Doubt Session', meta: 'Grade 10-A', owner: 'Ms. Wilson', status: 'Scheduled', statusTone: 'primary', value: '02:00 PM' },
      { title: 'English Literature', meta: 'Grade 9-C', owner: 'Ms. Brown', status: 'Recorded', statusTone: 'info', value: '48 mins' }
    ],
    pipeline: [
      { label: 'Scheduled', value: 64, tone: 'primary' },
      { label: 'Completed', value: 48, tone: 'success' },
      { label: 'Recorded', value: 72, tone: 'info' }
    ],
    quickActions: ['Zoom class', 'Google Meet', 'Recording library', 'Attendance sync']
  },
  parents: {
    eyebrow: 'Parent Portal',
    title: 'Parents',
    subtitle: 'Manage guardian profiles, linked students, contact details, meetings, and communication history.',
    action: 'Add Parent',
    icon: 'bi-people-fill',
    stats: [
      { label: 'Parent Accounts', value: '1,128', trend: '+34 active', icon: 'bi-people', tone: 'primary' },
      { label: 'Linked Students', value: '1,284', trend: '100% mapped', icon: 'bi-link-45deg', tone: 'success' },
      { label: 'Meeting Requests', value: '18', trend: 'This week', icon: 'bi-calendar-heart', tone: 'warning' },
      { label: 'Unread Messages', value: '36', trend: 'Needs reply', icon: 'bi-chat-dots', tone: 'info' }
    ],
    records: [
      { title: 'Michael Doe', meta: 'Parent of John Doe - Grade 10-A', owner: 'Class Teacher', status: 'Active', statusTone: 'success', value: '2 children' },
      { title: 'Neha Patel', meta: 'Profile update requested', owner: 'Front Office', status: 'Review', statusTone: 'warning', value: 'Phone' },
      { title: 'Sarah King', meta: 'Fee reminder acknowledged', owner: 'Accounts', status: 'Seen', statusTone: 'primary', value: 'Today' }
    ],
    pipeline: [
      { label: 'Profiles', value: 94, tone: 'success' },
      { label: 'App Usage', value: 72, tone: 'primary' },
      { label: 'Meetings', value: 38, tone: 'warning' }
    ],
    quickActions: ['Parent profile', 'Link student', 'Schedule meeting', 'Message history']
  },
  staff: {
    eyebrow: 'Human Resources',
    title: 'HR & Staff',
    subtitle: 'Manage non-teaching staff, departments, leave, payroll status, and staff attendance.',
    action: 'Add Staff',
    icon: 'bi-person-workspace',
    stats: [
      { label: 'Staff Members', value: '126', trend: '+5 joined', icon: 'bi-person-lines-fill', tone: 'primary' },
      { label: 'On Leave', value: '9', trend: 'Approved', icon: 'bi-calendar-x', tone: 'warning' },
      { label: 'Payroll Ready', value: '82%', trend: 'May cycle', icon: 'bi-cash-coin', tone: 'success' },
      { label: 'Open Positions', value: '6', trend: 'Hiring', icon: 'bi-briefcase', tone: 'info' }
    ],
    records: [
      { title: 'Office Administration', meta: '18 staff, 2 leave requests', owner: 'HR Desk', status: 'Stable', statusTone: 'success', value: '18' },
      { title: 'Support Staff Payroll', meta: 'Attendance verification pending', owner: 'Accounts', status: 'Review', statusTone: 'warning', value: '$7,200' },
      { title: 'Lab Assistant Hiring', meta: 'Science department vacancy', owner: 'Principal', status: 'Open', statusTone: 'info', value: '2 roles' }
    ],
    pipeline: [
      { label: 'Attendance', value: 88, tone: 'success' },
      { label: 'Payroll', value: 82, tone: 'primary' },
      { label: 'Hiring', value: 44, tone: 'info' }
    ],
    quickActions: ['Staff directory', 'Leave approval', 'Payroll status', 'Recruitment board']
  },
  assignments: {
    eyebrow: 'Learning',
    title: 'Assignments',
    subtitle: 'Create homework, collect submissions, track grading, and publish feedback.',
    action: 'Create Assignment',
    icon: 'bi-clipboard-check-fill',
    stats: [
      { label: 'Published', value: '74', trend: 'This month', icon: 'bi-journal-check', tone: 'primary' },
      { label: 'Submissions', value: '86%', trend: '+9%', icon: 'bi-upload', tone: 'success' },
      { label: 'Pending Grade', value: '142', trend: 'Across classes', icon: 'bi-pencil-square', tone: 'warning' },
      { label: 'Late', value: '31', trend: 'Follow up', icon: 'bi-clock-history', tone: 'danger' }
    ],
    records: [
      { title: 'Algebra Worksheet', meta: 'Grade 10-A Mathematics', owner: 'Ms. Wilson', status: 'Grading', statusTone: 'warning', value: '42/48' },
      { title: 'Physics Lab Report', meta: 'Grade 11-B Science', owner: 'Dr. Miller', status: 'Open', statusTone: 'primary', value: 'Due May 23' },
      { title: 'English Essay', meta: 'Grade 9-C Literature', owner: 'Ms. Brown', status: 'Published', statusTone: 'success', value: '86%' }
    ],
    pipeline: [
      { label: 'Assigned', value: 92, tone: 'primary' },
      { label: 'Submitted', value: 86, tone: 'success' },
      { label: 'Graded', value: 64, tone: 'warning' }
    ],
    quickActions: ['New homework', 'Submission inbox', 'Rubric builder', 'Publish feedback']
  },
  results: {
    eyebrow: 'Assessment',
    title: 'Results & Report Cards',
    subtitle: 'Compile marks, generate report cards, publish grades, and track performance.',
    action: 'Generate Report',
    icon: 'bi-award-fill',
    stats: [
      { label: 'Published Results', value: '18', trend: 'This term', icon: 'bi-patch-check', tone: 'success' },
      { label: 'Pending Sheets', value: '7', trend: 'Exam cell', icon: 'bi-hourglass-split', tone: 'warning' },
      { label: 'Average Score', value: '82%', trend: '+4%', icon: 'bi-graph-up', tone: 'primary' },
      { label: 'Rechecks', value: '11', trend: 'Open', icon: 'bi-arrow-repeat', tone: 'info' }
    ],
    records: [
      { title: 'Grade 10-A Final Term', meta: 'Mathematics result sheet', owner: 'Exam Cell', status: 'Ready', statusTone: 'success', value: '82%' },
      { title: 'Grade 11-B Physics', meta: 'Teacher marks pending', owner: 'Dr. Miller', status: 'Pending', statusTone: 'warning', value: '36/40' },
      { title: 'Report Card Batch', meta: 'Term 2 PDF generation', owner: 'Admin', status: 'Draft', statusTone: 'info', value: 'Grade 9' }
    ],
    pipeline: [
      { label: 'Marks Entry', value: 76, tone: 'primary' },
      { label: 'Verified', value: 68, tone: 'success' },
      { label: 'Published', value: 52, tone: 'warning' }
    ],
    quickActions: ['Marks entry', 'Grade setup', 'Report cards', 'Publish result']
  },
  events: {
    eyebrow: 'Calendar',
    title: 'Events & Calendar',
    subtitle: 'Plan holidays, exams, parent meetings, school events, and reminders.',
    action: 'Add Event',
    icon: 'bi-calendar-event-fill',
    stats: [
      { label: 'Upcoming Events', value: '24', trend: 'Next 30 days', icon: 'bi-calendar2-week', tone: 'primary' },
      { label: 'Holidays', value: '6', trend: 'This term', icon: 'bi-calendar-heart', tone: 'success' },
      { label: 'Meetings', value: '12', trend: 'Scheduled', icon: 'bi-people', tone: 'info' },
      { label: 'Conflicts', value: '3', trend: 'Resolve', icon: 'bi-exclamation-triangle', tone: 'warning' }
    ],
    records: [
      { title: 'Parent Teacher Meeting', meta: 'Grades 9-12', owner: 'Academic Office', status: 'Scheduled', statusTone: 'primary', value: 'May 25' },
      { title: 'Annual Sports Day', meta: 'Ground booking confirmed', owner: 'Sports Dept', status: 'Ready', statusTone: 'success', value: 'Jun 02' },
      { title: 'Mid-term Exam Window', meta: 'Timetable overlap detected', owner: 'Exam Cell', status: 'Conflict', statusTone: 'warning', value: '3 slots' }
    ],
    pipeline: [
      { label: 'Planned', value: 88, tone: 'primary' },
      { label: 'Notified', value: 72, tone: 'success' },
      { label: 'Conflicts', value: 18, tone: 'warning' }
    ],
    quickActions: ['School calendar', 'Holiday list', 'Event invite', 'Reminder broadcast']
  },
  website: {
    eyebrow: 'Public Website',
    title: 'Website CMS',
    subtitle: 'Manage notices, pages, gallery, sliders, testimonials, and public admission content.',
    action: 'Create Page',
    icon: 'bi-window-stack',
    stats: [
      { label: 'Published Pages', value: '28', trend: '+3 updates', icon: 'bi-file-richtext', tone: 'primary' },
      { label: 'Notices', value: '14', trend: 'Active', icon: 'bi-megaphone', tone: 'success' },
      { label: 'Gallery Items', value: '186', trend: '12 albums', icon: 'bi-images', tone: 'info' },
      { label: 'Drafts', value: '7', trend: 'Needs review', icon: 'bi-pencil', tone: 'warning' }
    ],
    records: [
      { title: 'Admissions 2026 Landing', meta: 'Public enquiry page', owner: 'Marketing', status: 'Live', statusTone: 'success', value: '2.4k views' },
      { title: 'Principal Message', meta: 'Homepage content update', owner: 'Admin', status: 'Draft', statusTone: 'warning', value: 'Review' },
      { title: 'Campus Gallery', meta: 'Annual day album', owner: 'Media Team', status: 'Published', statusTone: 'primary', value: '48 photos' }
    ],
    pipeline: [
      { label: 'Pages', value: 82, tone: 'primary' },
      { label: 'SEO', value: 66, tone: 'success' },
      { label: 'Drafts', value: 28, tone: 'warning' }
    ],
    quickActions: ['Page builder', 'Notice manager', 'Gallery upload', 'SEO settings']
  },
  support: {
    eyebrow: 'Help Desk',
    title: 'Support Tickets',
    subtitle: 'Track parent, student, teacher, and staff requests with ownership and SLA status.',
    action: 'New Ticket',
    icon: 'bi-life-preserver',
    stats: [
      { label: 'Open Tickets', value: '46', trend: '-8 today', icon: 'bi-ticket-detailed', tone: 'primary' },
      { label: 'Resolved', value: '132', trend: 'This month', icon: 'bi-check-circle', tone: 'success' },
      { label: 'Escalated', value: '5', trend: 'Admin review', icon: 'bi-arrow-up-right-circle', tone: 'danger' },
      { label: 'Avg Response', value: '2h', trend: 'Within SLA', icon: 'bi-stopwatch', tone: 'info' }
    ],
    records: [
      { title: 'Parent Login Issue', meta: 'Unable to access fee receipt', owner: 'IT Support', status: 'Open', statusTone: 'primary', value: 'High' },
      { title: 'Transport Stop Change', meta: 'Route 09 pickup update', owner: 'Transport', status: 'Pending', statusTone: 'warning', value: '24h' },
      { title: 'Report Card Query', meta: 'Marks clarification request', owner: 'Exam Cell', status: 'Resolved', statusTone: 'success', value: 'Closed' }
    ],
    pipeline: [
      { label: 'Open', value: 46, tone: 'primary' },
      { label: 'Resolved', value: 86, tone: 'success' },
      { label: 'Escalated', value: 12, tone: 'danger' }
    ],
    quickActions: ['Ticket inbox', 'Assign owner', 'SLA rules', 'Support report']
  },
  'audit-logs': {
    eyebrow: 'Security',
    title: 'Audit Logs',
    subtitle: 'Review login history, sensitive updates, deleted records, and admin actions.',
    action: 'Export Logs',
    icon: 'bi-shield-check',
    stats: [
      { label: 'Events Today', value: '1,842', trend: 'Normal', icon: 'bi-activity', tone: 'primary' },
      { label: 'Admin Actions', value: '96', trend: 'Tracked', icon: 'bi-person-gear', tone: 'info' },
      { label: 'Failed Logins', value: '12', trend: '-4', icon: 'bi-shield-exclamation', tone: 'warning' },
      { label: 'Critical Alerts', value: '2', trend: 'Review', icon: 'bi-exclamation-octagon', tone: 'danger' }
    ],
    records: [
      { title: 'Fee Record Updated', meta: 'Invoice #INV-9021 amount changed', owner: 'Accounts Admin', status: 'Logged', statusTone: 'primary', value: '10:42 AM' },
      { title: 'Role Permission Changed', meta: 'Teacher export permission enabled', owner: 'SuperAdmin', status: 'Sensitive', statusTone: 'warning', value: '09:18 AM' },
      { title: 'Failed Login Burst', meta: '3 attempts for admin account', owner: 'Security', status: 'Alert', statusTone: 'danger', value: 'IP check' }
    ],
    pipeline: [
      { label: 'Normal', value: 92, tone: 'success' },
      { label: 'Review', value: 24, tone: 'warning' },
      { label: 'Critical', value: 8, tone: 'danger' }
    ],
    quickActions: ['Login history', 'Admin actions', 'Export CSV', 'Alert rules']
  },
  permissions: {
    eyebrow: 'Access Control',
    title: 'Roles & Permissions',
    subtitle: 'Control module access for admins, teachers, students, parents, accountants, and staff.',
    action: 'Create Role',
    icon: 'bi-person-lock',
    stats: [
      { label: 'Roles', value: '8', trend: 'Default setup', icon: 'bi-person-badge', tone: 'primary' },
      { label: 'Permission Groups', value: '42', trend: 'Across modules', icon: 'bi-ui-checks-grid', tone: 'success' },
      { label: 'Pending Reviews', value: '6', trend: 'Security', icon: 'bi-eye', tone: 'warning' },
      { label: '2FA Enabled', value: '62%', trend: '+11%', icon: 'bi-shield-lock', tone: 'info' }
    ],
    records: [
      { title: 'Accountant', meta: 'Fees, accounting, reports', owner: 'SuperAdmin', status: 'Active', statusTone: 'success', value: '12 permissions' },
      { title: 'Class Teacher', meta: 'Attendance, assignments, results', owner: 'Academic Admin', status: 'Review', statusTone: 'warning', value: '18 permissions' },
      { title: 'Parent', meta: 'Student profile, fees, messages', owner: 'System', status: 'Locked', statusTone: 'primary', value: 'Read only' }
    ],
    pipeline: [
      { label: 'Configured', value: 84, tone: 'primary' },
      { label: 'Reviewed', value: 68, tone: 'success' },
      { label: '2FA', value: 62, tone: 'info' }
    ],
    quickActions: ['Permission matrix', 'Create role', '2FA policy', 'Access review']
  },
  settings: {
    eyebrow: 'System',
    title: 'Settings',
    subtitle: 'Configure school profile, modules, permissions, security, and integrations.',
    action: 'Save Changes',
    icon: 'bi-sliders2',
    stats: [
      { label: 'Enabled Modules', value: '18', trend: 'ERP suite', icon: 'bi-toggle-on', tone: 'primary' },
      { label: 'Roles', value: '8', trend: 'Default roles', icon: 'bi-shield-lock', tone: 'success' },
      { label: 'Integrations', value: '5', trend: 'SMS, email, domain', icon: 'bi-plug', tone: 'info' },
      { label: 'Security Alerts', value: '2', trend: 'Review 2FA', icon: 'bi-shield-exclamation', tone: 'warning' }
    ],
    records: [
      { title: 'Role Permission', meta: 'Admin, Teacher, Accountant, Librarian, Parent, Student', owner: 'SuperAdmin', status: 'Active', statusTone: 'success', value: '8 roles' },
      { title: 'Custom Domain', meta: 'school.academix.local', owner: 'IT Admin', status: 'Pending DNS', statusTone: 'warning', value: 'SSL' },
      { title: 'Two Factor Authentication', meta: 'Email/app based verification', owner: 'Security', status: 'Partial', statusTone: 'info', value: '62%' }
    ],
    pipeline: [
      { label: 'Modules', value: 86, tone: 'primary' },
      { label: 'Permissions', value: 74, tone: 'success' },
      { label: 'Security', value: 62, tone: 'warning' }
    ],
    quickActions: ['School profile', 'Module manager', 'Role permissions', 'System backup']
  }
};

@Component({
  selector: 'app-operations-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operations-page.html',
  styleUrl: './operations-page.scss'
})
export class OperationsPageComponent {
  private route = inject(ActivatedRoute);
  private routeData = toSignal(this.route.data, { initialValue: { page: 'admissions' } });
  selectedRange = signal('This Month');
  ranges = ['Today', 'This Week', 'This Month', 'Session'];

  page = computed(() => PAGE_CONFIGS[String(this.routeData()['page'])] ?? PAGE_CONFIGS['admissions']);

  setRange(range: string) {
    this.selectedRange.set(range);
  }
}
