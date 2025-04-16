import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  user:{
    full_name:''
  }
  conference: {
    title: string;
    date: string;
    location: string;
    time: string;
  };
  dayLeft = 0;

  constructor() {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;

    this.conference = {
      title: user?.conference?.title || '',
      date: user?.conference?.date ? new Date(user.conference.date).toLocaleDateString() : '',
      location: user?.conference?.location || '',
      time: user?.conference?.time ? new Date(`1970-01-01T${user.conference.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
    };
    if (user?.conference?.date) {
      const currentDate = new Date();
      const conferenceDate = new Date(user?.conference?.date);
      const timeDiff = conferenceDate.getTime() - currentDate.getTime();
      this.dayLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    } else {
      this.dayLeft = 0;
    }
  }

}
