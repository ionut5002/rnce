import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role;
  constructor(
    public authService: AuthService
  ) { 
    if(this.authService.loggedIn()){
      this.authService.getProfile().subscribe(profile => {
        this.role = profile.user.role;
      });
    }
  }

  ngOnInit() {
    
  }
  
}
