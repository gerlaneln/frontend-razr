import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductFamily } from 'src/app/models/product-family.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFamilyService {

  api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductFamily[]>{
    return this.http.get<ProductFamily[]>(this.api+'/family/');
  }

  getById(id: number): Observable<ProductFamily>{
    return this.http.get<ProductFamily>(this.api+'/family/'+id);
  }

  insert(id: number, object: ProductFamily): Observable<ProductFamily>{
    return this.http.post<ProductFamily>(this.api + '/log/' + id +'/family/',object);
  }

  update(id: number, object: ProductFamily): Observable<ProductFamily>{
    return this.http.put<ProductFamily>(this.api+'/log/'+id+'/family/', object);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.api+'/family/'+id);
  }

}
