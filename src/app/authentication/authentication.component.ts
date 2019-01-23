import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  jbbData = null;
  isAuthenticated = false;
  welcomeMessage = "";
  constructor(private authService: AuthService) { 

  }

  ngOnInit() {
    if(localStorage.getItem('jbb-data')){
      this.refreshFlags();
    }
  }

  refreshFlags(){
    this.isAuthenticated = true;
    this.welcomeMessage = "Bienvenue";
    this.jbbData = localStorage.getItem('jbb-data');
  }

  login(loginForm){
    console.log(loginForm);
    this.authService.login(loginForm)
                    .subscribe(
                      (data) => this.handleLoginSuccess(data),
                      (error) =>  this.handleLoginError(error)
                    )
  }

  handleLoginSuccess(data) : void {
    console.log('success ' + JSON.stringify(data));
    this.isAuthenticated = true;
    this.welcomeMessage = "Bienvenue";
    localStorage.setItem('jbb-data',JSON.stringify(data));
  }

  handleLoginError(data) : void {
    console.log('error '+ JSON.stringify(data));
  }

}
