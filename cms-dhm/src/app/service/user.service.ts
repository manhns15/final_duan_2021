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

  findAllUser(): Observable<any> {
    return this.http.get<any>(this.api + '/users');
  }
  findUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.api + '/user'}/${id}`);
  }
  update(obj: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.api + '/user'}/${id}`, obj, httpOptions);
  }
  getUser(): Observable<any> {
    return this.http.get<any>(this.api + '/user/username');
  }
}
