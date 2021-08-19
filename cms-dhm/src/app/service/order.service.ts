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
  getOrderByStatus(status: any): Observable<any> {
    return this.http.get<any>(`${this.api + '/orders/bystatus'}/${status}`);
  }
  getOrderBySku(sku: any): Observable<any> {
    return this.http.get<any>(`${this.api + '/orders/sku'}/${sku}`);
  }
  createOrder(obj: any): Observable<any> {
    return this.http.post<any>(this.api + '/orders', obj, httpOptions);
  }
  getOrderUserByStatus(status: any): Observable<any> {
    return this.http.get<any>(`${this.api + '/orders/user'}/${status}`);
  }
  getOrderUser(): Observable<any> {
    return this.http.get<any>(`${this.api + '/orders/user'}`);
  }
  updateOrder(obj: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.api + '/orders'}/${id}`, obj, httpOptions);
  }
  getCountBoom(): Observable<any> {
    return this.http.get<any>(this.api + '/orders/boom');
  }
  getCountBoomByPhone(phone: any): Observable<any> {
    return this.http.get<any>(`${this.api + '/orders/boom'}/${phone}`);
  }
}

