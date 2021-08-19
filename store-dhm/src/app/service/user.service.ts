import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {
  api = 'http://localhost:5000/v1/api';
  constructor(
    private http: HttpClient
  ) { }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.api + '/user'}/${id}`);
  }
  changePassword(obj: any): Observable<any> {
    return this.http.post( this.api + '/changepass', obj, httpOptions);
  }
  getInforUser(): Observable<any> {
    return this.http.get(this.api + '/user/username');
  }
  updateUser(obj: any, id: any): Observable<any> {
    return this.http.put(`${this.api + '/user'}/${id}`, obj, httpOptions);
  }
}
