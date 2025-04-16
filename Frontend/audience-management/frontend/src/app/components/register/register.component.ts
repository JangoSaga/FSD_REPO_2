import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../utils/passwordValidators';
import { CommonModule } from '@angular/common';
import { CONSTANTS } from '../../utils/constant';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  banner = CONSTANTS.BANNER;
  user = CONSTANTS.USER;
  registerForm: FormGroup;
  conferences: any[] = [];
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group(
      {
        full_name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        affilation: ['', [Validators.required, Validators.minLength(2)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required, Validators.minLength(6)]],
        conference_id: ['', [Validators.required]] // Ensure this is included

      },
      { validators: passwordMatchValidator }
    );
  }
  ngOnInit(): void {
    this.authService.getConferences().subscribe({
      next: (response) => {
        this.conferences = response;
        // console.log('Conferences:', this.conferences);
      },
      error: (error) => {
        console.error('Error fetching conferences:', error);
      }
    });
  }
  registerAudience() {
    if (this.registerForm.valid) {
      const formData = { ...this.registerForm.value };
      // console.log(this.registerForm.value);
      // console.log('Conference ID before parse:', formData.conference_id);
    if (formData.conference_id && !isNaN(formData.conference_id)) {
      formData.conference_id = parseInt(formData.conference_id, 10);
    } else {
      // console.error('Invalid conference_id:', formData.conference_id);
      return;
    }

    console.log('Final Form Data:', formData);
      this.authService.register(formData).subscribe({
        next: (response) => {
          // console.log('Success:', response);
          alert('Registered successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          // console.error("Registration failed:", error);
          alert("Registration failed. Try again.");
        }
      });
    } else {
      alert("Some fields are invalid!");
    }
  }
}
