import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhoneCompany } from '../models/phone-company.model';

@Injectable({
  providedIn: 'root',
})
export class PhoneCompanyService {
  api: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PhoneCompany[]> {
    return this.http.get<PhoneCompany[]>(this.api + '/phone_company/');
  }

  getById(id: number): Observable<PhoneCompany> {
    return this.http.get<PhoneCompany>(this.api + '/phone_company/' + id);
  }

  getByRegion(id: number): Observable<PhoneCompany[]> {
    return this.http.get<PhoneCompany[]>(this.api + '/phone_company/search/region/' + id);
  }

  insert(id: number, object: PhoneCompany): Observable<PhoneCompany> {
    return this.http.post<PhoneCompany>(this.api + '/log/' + id + '/phone_company/', object);
  }

  update(id: number, object: PhoneCompany): Observable<PhoneCompany> {
    return this.http.put<PhoneCompany>(
      this.api + '/log/' + id + '/phone_company/',
      object
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.api + '/phone_company/' + id);
  }
}
