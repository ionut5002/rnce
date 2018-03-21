import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthGuard } from 'app/guards/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username= '';
  email = '';
  messageClass;
  message;
  processing = false;
  form;
  previousUrl;

  constructor(
  private formBuilder: FormBuilder,
  private authService: AuthService,
  private router: Router,
  private authGuard: AuthGuard
  ) {
    this.createForm();
   }

  ngOnInit() {
    
    // Once component loads, get user's data to display on profile
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
    });
  }
  createForm() {
    this.form = this.formBuilder.group({
      newPassword: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }
  // Function to disable form
disableForm() {
  this.form.controls['newPassword'].disable(); // Disable username field
  this.form.controls['password'].disable(); // Disable password field
}

// Function to enable form
enableForm() {
  this.form.controls['newPassword'].enable(); // Enable username field
  this.form.controls['password'].enable(); // Enable password field
}
  onChangePasswordSubmit() {
    this.authService.createAuthenticationHeaders();
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const CPass = {
      newPassword: this.form.get('newPassword').value, // Username input field
      password: this.form.get('password').value // Password input field
      
    }
  console.log(CPass)
    // Function to send login data to API
    this.authService.ChangePassword(CPass).subscribe(data => {
      // Check if response was a success or error
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message; // Set success message
        // Function to store user's token in client local storage
        // After 2 seconds, redirect to dashboard page
        setTimeout(() => {
          // Check if user was redirected or logging in for first time
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
          } else {
            this.router.navigate(['/dashboard']); // Navigate to dashboard view
          }
        }, 2000);
      }
    });
  }

}

