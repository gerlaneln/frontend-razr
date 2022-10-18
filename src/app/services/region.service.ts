import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  api: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Region[]> {
    return this.http.get<Region[]>(this.api + '/region/');
  }


  getById(id: number): Observable<Region> {
    return this.http.get<Region>(this.api + '/region/' + id);
  }

  insert(id:number,object: Region): Observable<Region> {
    return this.http.post<Region>(this.api+'/log/'+id+'/region/', object);
  }

  update(id: number, object: Region): Observable<Region> {
    return this.http.put<Region>(this.api + '/log/' + id + '/region/', object);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.api + '/region/' + id);
  }
}
