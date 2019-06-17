import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:3000/users'

  private isClientAuthenticatedRequestUrl: string;
  private loginRequestUrl: string;
  private signupRequestUrl: string;
  private logoutRequestUrl: string;

  constructor(private http: HttpClient) { 
      this.isClientAuthenticatedRequestUrl = this.baseUrl;
      this.loginRequestUrl = this.baseUrl + '/login';
      this.signupRequestUrl = this.baseUrl + '/signup';
      this.logoutRequestUrl = this.baseUrl + '/logout';
  }

  isClientAuthenticated(){
    return this.http.get(this.isClientAuthenticatedRequestUrl);
  }

  login(username: string, password: string){
    return this.http.post(this.loginRequestUrl, {username: username, password: password}, {withCredentials: true});
  }
  
}
