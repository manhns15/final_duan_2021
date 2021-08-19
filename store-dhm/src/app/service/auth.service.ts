import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

const AUTH_API = `http://localhost:5000/secure/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  // register(username: string, email: string, password: string, sodienthoai: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'signup', {
  //     username,
  //     password,
  //     email,
  //     sodienthoai
  //   }, httpOptions);
  // }
  register(obj: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', obj, httpOptions);
  }
}
