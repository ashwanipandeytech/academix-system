import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-center.html',
  styleUrl: './notification-center.scss',
})
export class NotificationCenterComponent {
  notifications = [
    { id: 1, title: 'Exam Schedule Out', message: 'The mid-term exam schedule has been posted on the notice board.', date: '2023-10-01', sender: 'Admin', type: 'info' },
    { id: 2, title: 'Holiday Notice', message: 'School will be closed on Friday for Gandhi Jayanti.', date: '2023-09-30', sender: 'Principal', type: 'warning' },
    { id: 3, title: 'Fee Payment Reminder', message: 'Please pay the school fees for the second quarter by Oct 10.', date: '2023-10-02', sender: 'Accounts', type: 'danger' },
    { id: 4, title: 'Sports Day Results', message: 'Congratulations to the winners of the Annual Sports Day!', date: '2023-09-25', sender: 'Sports Dept', type: 'success' },
    { id: 5, title: 'New Library Books', message: 'New collection of science fiction books added to the library.', date: '2023-10-03', sender: 'Librarian', type: 'info' }
  ];
}
