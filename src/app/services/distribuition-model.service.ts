import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Distribuition } from '../models/distribuition.model';

@Injectable({
  providedIn: 'root'
})
export class DistribuitionModelService {

  api: string = environment.apiUrl;


  constructor(private http: HttpClient) { }


  getAll(): Observable<Distribuition[]>{
    return this.http.get<Distribuition[]>(this.api+'/model/');
  }

  getById(id: number): Observable<Distribuition>{
    return this.http.get<Distribuition>(this.api+'/model/'+id);
  }

  insert(id: number, object: Distribuition): Observable<Distribuition>{
    return this.http.post<Distribuition>(this.api+'/log/'+id+'/model/', object);
  }

  update(id: number, object: Distribuition): Observable<Distribuition>{
    return this.http.put<Distribuition>(this.api+'/log/'+id+'/model/', object);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.api+'/model/'+id);
  }
}
