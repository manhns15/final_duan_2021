import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    api = 'http://localhost:5000/v1/api';
    constructor(
        private http: HttpClient
    ) { }
    getAllCategory(): Observable<any> {
        return this.http.get<any>(this.api + '/categorys');
    }
    getProductByCategory(id: any): Observable<any> {
        return this.http.get<any>(`${this.api + '/products'}/categorys/${id}`);
    }
}
