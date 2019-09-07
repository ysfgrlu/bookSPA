import { Injectable } from '@angular/core';
import { LoginUser } from '../models/login-user';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/register-user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LogoutUser } from '../models/logout-user';

interface Response{
data:any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) { }

  path = "http://localhost:8000/api/";
  userToken: any;
  TOKEN_KEY = "token";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post<Response>(this.path + "login", loginUser, { headers: headers })
    .pipe(catchError(error=>this.handleError(this,error)))
    .subscribe(response => {
    console.log(response);
     this.saveToken(response.data['api_token'], response.data['name']);
      this.alertifyService.success("Başarıyla giriş yaptınız.");
      this.router.navigateByUrl("/product");
    });
  }
  handleError(scope,error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.status}`;
    }
    if(errorMessage == '422')
    {
      scope.alertifyService.error("Hatalı kullanıcı adı veya parola");
    }
    alert(error.message);
    return throwError(errorMessage);
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post<Response>(this.path + "register", registerUser, { headers: headers })
    .pipe(catchError(error=>this.handleError(this,error)))
    .subscribe(response => {
      this.alertifyService.success("Kayıt işlemi başarılı");
      this.saveToken(response.data['api_token'],response.data['name']);
      this.router.navigateByUrl("/product");
    });
  }

  logOut() {
    let logoutUser:LogoutUser = new LogoutUser();
    logoutUser.api_token = this.token;
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + "logout", logoutUser, { headers: headers }).subscribe(data => {
      this.alertifyService.success("Başarıyla çıkış yaptınız");
      this.router.navigateByUrl("/users");
      console.log(data);
    });
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem("user");
  }

  saveToken(token,email) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem("user", email);
  }

  loggedIn() {
    if(localStorage.getItem(this.TOKEN_KEY) === null){
      return false;
    }
    return true;
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId() {
  //  return this.jwtHelper.decodeToken(this.token).nameid;
  }
}
