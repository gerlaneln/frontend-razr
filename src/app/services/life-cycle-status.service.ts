import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LifeCycleStatus } from '../models/life-cycle-status.model';

@Injectable({
  providedIn: 'root'
})
export class LifeCycleStatusService {

  api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<LifeCycleStatus[]>{
    return this.http.get<LifeCycleStatus[]>(this.api+'/status/');
  }

  getById(id: number): Observable<LifeCycleStatus>{
    return this.http.get<LifeCycleStatus>(this.api+'/status/'+id);
  }

  insert(id: number, object: LifeCycleStatus): Observable<LifeCycleStatus>{
    return this.http.post<LifeCycleStatus>(this.api+'/log/'+id+'/status/',object);
  }

  update(id: number, object: LifeCycleStatus): Observable<LifeCycleStatus>{
    return this.http.put<LifeCycleStatus>(this.api+'/log/'+id+'/status/', object);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.api+'/status/'+id);
  }

}
