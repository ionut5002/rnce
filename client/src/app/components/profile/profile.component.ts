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
  role= '';
  messageClass;
  message;
  processing = false;
  ChangePassform;
  previousUrl;
  ChangePassOpen= false;
  

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
      this.email = profile.user.email;
      this.role = profile.user.role; // Set e-mail
    });
  }
  createForm() {
    this.ChangePassform = this.formBuilder.group({
      newPassword: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }
  // Function to disable form
disableForm() {
  this.ChangePassform.controls['newPassword'].disable(); // Disable username field
  this.ChangePassform.controls['password'].disable(); // Disable password field
}

// Function to enable form
enableForm() {
  this.ChangePassform.controls['newPassword'].enable(); // Enable username field
  this.ChangePassform.controls['password'].enable(); // Enable password field
}
  onChangePasswordSubmit() {
    this.authService.createAuthenticationHeaders();
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const CPass = {
      newPassword: this.ChangePassform.get('newPassword').value, // Username input field
      password: this.ChangePassform.get('password').value // Password input field
      
    }
  
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
        setTimeout(() => {
            this.processing = false;
            this.ChangePassOpen= false;
            this.ChangePassform.reset();
            this.enableForm();
            window.location.reload()
        }, 2000);
      }
    });
  }
  
changePasswordBtn(){
  if(this.ChangePassOpen){
    this.ChangePassOpen = false
  }else{
    this.ChangePassOpen = true
  }
}
}

