import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class StatisticalService {
  api = 'http://localhost:5000/v1/api';
  constructor(
    private http: HttpClient
  ) { }

  getAllData(): Observable<any> {
    return this.http.get<any>(this.api + '/statistical');
  }
  getAllByDate(obj: any): Observable<any> {
    return this.http.post<any>(this.api + '/statistical', obj, httpOptions);
  }
}


