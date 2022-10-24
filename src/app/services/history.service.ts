import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { History } from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  api: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAllByProduct(id:number): Observable<History[]>{
    return this.http.get<History[]>(this.api+'/history/search/histories/'+id);
  }

  getAllByDateDesc(id: number): Observable<History[]>{
    return this.http.get<History[]>(this.api+'/history/search/histories/bydate/desc/'+id);
  }

  getAllByDateAsc(id: number): Observable<History[]>{
    return this.http.get<History[]>(this.api+'/history/search/histories/bydate/asc/'+id);
  }
}
