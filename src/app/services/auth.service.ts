import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, tap } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:4201/auth/'

  constructor(private http: HttpClient) { }

  login(credentials){
    return this.http.post(`${this.BASE_URL}/login`,credentials)
                    .pipe(map((res) => {
                      return res;
                    }));
  }

  userIsLoggedIn(): boolean{
    return !!localStorage.getItem('jbb-data');
  }

  logOut(){
    localStorage.removeItem('jbb-data');
  }

  register(data){
    return this.http.post(`${this.BASE_URL}/register`,data)
                    .pipe(map((res) => {
                      return res;
                    }));
  }

  decodeTokken(token){
    return jwtDecode(token);
  }

  addAuthorizationHeader(token) {
    // 'Authorization': 'Bearer tokennnnnnnnn....'
    const header = {'headers' : new HttpHeaders().set('Authorization', 'Bearer ' + token)};
    return header;
  }

}
