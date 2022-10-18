import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {



  api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Team[]>{
    return this.http.get<Team[]>(this.api+'/team/');
  }

  getById(id: number): Observable<Team>{
    return this.http.get<Team>(this.api+'/team/'+id);
  }

  insert(id: number, object: Team): Observable<Team>{
    return this.http.post<Team>(this.api+'/log/'+id+'/team/', object);
  }

  update(id: number, object: Team): Observable<Team>{
    return this.http.put<Team>(this.api+'/log/'+id+'/team/', object);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.api+'/team/'+id);
  }}
