import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  decodeToken = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.userIsLoggedIn){
      const token = JSON.parse(localStorage.getItem('jbb-data'))
      this.decodeToken = this.authService.decodeTokken(token.token)
      console.log(this.decodeToken)
    }
  }

}
