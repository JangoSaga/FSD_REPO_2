import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {
  constructor(private router: Router,private authService: AuthService) {
    if (authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
