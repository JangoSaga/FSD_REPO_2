import { CONSTANTS } from './../../utils/constant';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  banner = CONSTANTS.BANNER;
  user = CONSTANTS.USER;
  constructor( private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    // console.log('User:', this.user);
    // console.log('Banner:', this.banner);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          // console.log(response)
          const user = {
            full_name: response?.full_name,
            audience_id: response?.audience_id,
            phone_no:response?.phone_no,
            email:response?.email,
            conference:response?.conference,
            affilation: response?.affilation,
          }
          localStorage.setItem('user', JSON.stringify(user));
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = 'Invalid credentials, please try again.';
          console.error('Login error:', err);
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
