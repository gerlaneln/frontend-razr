import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductScope } from '../models/product-scope.model';



@Injectable({
  providedIn: 'root'
})
export class ProductScopeService {

  api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductScope[]>{
    return this.http.get<ProductScope[]>(this.api+'/scope/');
  }

  getById(id: number): Observable<ProductScope>{
    return this.http.get<ProductScope>(this.api+'/scope/'+id);
  }

  getByProduct(id: number): Observable<ProductScope>{
    return this.http.get<ProductScope>(this.api+'/scope/search/product/'+id);
  }

  insert(id: number, object: ProductScope): Observable<ProductScope>{
    return this.http.post<ProductScope>(this.api+'/log/'+id+'/scope/', object);
  }

  update(id: number, object: ProductScope): Observable<ProductScope>{
    return this.http.put<ProductScope>(this.api+'/log/'+id+'/scope/', object);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.api+'/scope/'+id);
  }

}
