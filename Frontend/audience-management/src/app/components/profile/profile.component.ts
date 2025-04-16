import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user:{
    full_name:string,
    phone_no:string,
    affilation:string,
    audience_id:string
  }

  profileForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private authService:AuthService,private router:Router) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.profileForm = this.formBuilder.group({
      full_name: ['', [Validators.minLength(3)]],
      phone_no: ['', [Validators.pattern(/^\d{10}$/)]],
      affilation: ['', [Validators.minLength(3)]]
    });
  }

  profileSubmit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.audience_id;

    if (!userId) {
      alert("Invalid user ID. Please log in again.");
      return;
    }

    const updatedData: any = {};

    Object.keys(this.profileForm.controls).forEach((key) => {
      const control = this.profileForm.get(key);
      if (control?.value && control.value !== user[key]) {
        updatedData[key] = control.value;
      }
    });

    if (Object.keys(updatedData).length === 0) {
      alert("Please update at least one field.");
      return;
    }

    this.authService.updateProfile(userId, updatedData).subscribe({
      next: (response) => {
        // console.log("Profile updated:", response);
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully");
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        // console.error("Update failed:", error);
        alert("Failed to update profile. Try again.");
      },
    });
  }

}
