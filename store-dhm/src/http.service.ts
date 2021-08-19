import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:5000/v1/api';
@Injectable({ providedIn: 'root' })
export class HttpService {
     
    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<any> {
        return this.http.get<any>(API_URL + `/productdetails`);
    }
    getAllCategory(): Observable<any> {
        return this.http.get<any>(API_URL + '/categorys');
    }
    getAllProduct(): Observable<any> {
        return this.http.get<any>(API_URL + '/products');
    }
    getProductByCategory(id: any): Observable<any> {
        return this.http.get<any>(`${API_URL}/products/${id}/categorys`);
    }
    getProductById(id: any): Observable<any> {
        return this.http.get<any>(`${API_URL + '/productdetails'}/${id}`);
    }
}
