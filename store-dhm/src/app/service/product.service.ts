import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ProductService {
    listProductByName: any[] = [];
    api = 'http://localhost:5000/v1/api';
    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<any> {
        return this.http.get<any>(this.api + `/productdetails`);
    }
    getProductByName(product: any): Observable<any> {
      return this.http.get<any>(`${this.api + '/products/byName'}/${product}`);
    }
    getAllProduct(): Observable<any> {
        return this.http.get<any>(this.api + '/products');
    }
    getProductById(id: any): Observable<any> {
        return this.http.get<any>(`${this.api + '/productdetails'}/${id}`);
    }
    addCartLogin(obj: any): Observable<any> {
      return this.http.post<any>(this.api + '/cart', obj, httpOptions);
    }

}
