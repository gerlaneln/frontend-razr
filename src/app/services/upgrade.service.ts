import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Upgrade } from '../models/upgrade';

@Injectable({
  providedIn: 'root',
})
export class UpgradeService {
  api: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Upgrade[]> {
    return this.http.get<Upgrade[]>(this.api + '/upgrade/');
  }

  getById(id: number): Observable<Upgrade> {
    return this.http.get<Upgrade>(this.api + '/upgrade/' + id);
  }

  getByProduct(id: number): Observable<Upgrade>{
    return this.http.get<Upgrade>(this.api+'/upgrade/search/product/'+id);
  }

  insert(id: number, object: Upgrade): Observable<Upgrade> {
    return this.http.post<Upgrade>(this.api + '/log/' +id+ '/upgrade/', object);
  }

  update(id: number, object: Upgrade): Observable<Upgrade> {
    return this.http.put<Upgrade>(
      this.api + '/log/' + id + '/upgrade/',
      object
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.api + '/upgrade/' + id);
  }
}
