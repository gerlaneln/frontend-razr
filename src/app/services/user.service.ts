import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  api: string = environment.apiUrl;
  
  get(): Observable<User[]>{
    return this.http.get<User[]>(this.api+'/user/');
  }

  getById(id: number): Observable<User>{
    return this.http.get<User>(this.api+'/user/'+id);
  }

  getByUsername(username: string): Observable<User>{
    return this.http.get<User>(this.api+'/user/search/'+username);
  }

  insert(id: number, object: User): Observable<User>{
    return this.http.post<User>(this.api+'/log/'+id+'/user/', object);
  }

  signUpUser(object: User): Observable<User>{
    return this.http.post<User>(this.api+'/user_info/user/', object);
  }

  update(id: number, object: User): Observable<User>{
    return this.http.put<User>(this.api+'/log/'+id+'/user/', object);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.api+'/user/'+id);
  }
}
