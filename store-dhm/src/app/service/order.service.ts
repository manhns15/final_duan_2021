import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class OrderService {
  api = 'http://localhost:5000/v1/api';
  constructor(
    private http: HttpClient
  ) { }
  getAll(): Observable<any> {
      return this.http.get<any>(this.api + '/orders');
  }
  createOrder(obj: any): Observable<any> {
    return this.http.post<any>(this.api + '/orders', obj, httpOptions);
  }
  getOrderByStatus(status: any): Observable<any> {
    return this.http.get<any>(`${this.api + '/orders/bystatus'}/${status}`);
  }
  getOrderBySku(sku: any): Observable<any> {
    return this.http.get<any>(`${this.api + '/orders/sku'}/${sku}`);
  }
  getOrderByUser(): Observable<any> {
    return this.http.get<any>(this.api + '/orders/user');
  }
  getOrderUserByStatus(status: any): Observable<any> {
    return this.http.get<any>(`${this.api + '/orders/user'}/${status}`);
  }
}
