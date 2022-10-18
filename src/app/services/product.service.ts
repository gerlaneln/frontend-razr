import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.api+'/product/');
  }

  getById(id: number): Observable<Product>{
    return this.http.get<Product>(this.api+'/product/'+id);
  }

  insert(id: number, object: Product): Observable<Product>{
    return this.http.post<Product>(this.api+'/log/'+id+'/product/', object);
  }

  insertImage(id: number, object: Product): Observable<Product>{
    return this.http.post<Product>(this.api+'/log/'+id+'/product/image/', object);
  }

  update(id: number, object: Product): Observable<Product>{
    return this.http.put<Product>(this.api+'/log/'+id+'/product/', object);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.api+'/product/'+id);
  }
}
