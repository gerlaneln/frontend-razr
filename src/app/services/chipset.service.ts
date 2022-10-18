import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chipset } from 'src/app/models/chipset.model';

@Injectable({
  providedIn: 'root'
})
export class ChipsetService {

  api: string = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getAll(): Observable<Chipset[]>{
    return this.http.get<Chipset[]>(this.api+'/chipset/');
  }

  getById(id: number): Observable<Chipset>{
    return this.http.get<Chipset>(this.api+'/chipset/'+id);
  }

  insert(id: number, object: Chipset): Observable<Chipset>{
    return this.http.post<Chipset>(this.api+'/log/'+id+'/chipset/',object);
  }

  update(id: number, object: Chipset): Observable<Chipset>{
    return this.http.put<Chipset>(this.api+'/log/'+id+'/chipset/', object);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.api+'/chipset/'+id);
  }
}
