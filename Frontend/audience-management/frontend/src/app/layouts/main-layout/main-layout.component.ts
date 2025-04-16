import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  user:{
    full_name:''
  }
  constructor(private router:Router, private authService : AuthService){
    if(!authService.isAuthenticated()){
      this.router.navigate(['/'])
    }
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
  handleLogout(){
    this.authService.logout()
  }
  profile(){
    this.router.navigate(['dashboard/profile'])
  }
}
