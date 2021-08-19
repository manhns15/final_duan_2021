import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })
export class CategoryService {
    api = 'http://localhost:5000/v1/api';
    constructor(
        private http: HttpClient
    ) { }
    getAll(): Observable<any> {
        return this.http.get<any>(this.api + '/categorys');
    }
    getProductByCategory(id: any): Observable<any> {
        return this.http.get<any>(`${this.api + '/products/categorys'}/${id}`);
    }
    createCategory(obj: any): Observable<any> {
      return this.http.post<any>(this.api + '/category', obj, httpOptions);
    }
    updateNew(obj: any, id: any): Observable<any> {
      return this.http.put<any>(`${this.api + '/category'}/${id}`, obj, httpOptions);
    }
    deleteNew(id: any): Observable<any> {
      return this.http.delete<any>(`${this.api + '/category'}/${id}`);
    }
}
