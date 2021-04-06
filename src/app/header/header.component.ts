import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isloggedin = false;
  username = '';
  constructor(private authService: AuthServiceService,
              private router: Router) { }

  ngOnInit() {

    if ( this.authService.isLoggedIn()) {
      this.isloggedin = true;
      this.username = this.authService.getUsername();
    } else {
      this.isloggedin = false;
    }

    this.authService.username.subscribe(data => {
      this.username = data;
    });
    this.authService.loggedIn.subscribe( data => {
      this.isloggedin = data;
    });
  }

  goToUserProfile() {
    this.router.navigateByUrl('/view-userprofile/' + this.username);
  }

  logout() {
    this.authService.logout();
    this.isloggedin = false;
    this.router.navigateByUrl('/login');
  }

  goToResetPassword() {
    this.router.navigateByUrl('/resetPassword');
  }
}
