import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team';
import { TeamFormation } from '../models/team-formation.model';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class team_formationService {
  api: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TeamFormation[]> {
    return this.http.get<TeamFormation[]>(this.api + '/team_formation/');
  }

  getById(id: number): Observable<TeamFormation> {
    return this.http.get<TeamFormation>(this.api + '/team_formation/' + id);
  }

  getByUser(idUser: number): Observable<Team[]>{
    return this.http.get<Team[]>(this.api+'/team_formation/search/user/'+idUser);
  }

  getByTeam(idTeam: number): Observable<User[]>{
    return this.http.get<User[]>(this.api+'/team_formation/search/team/'+idTeam);
  }

  insert(id: number, object: TeamFormation): Observable<TeamFormation> {
    return this.http.post<TeamFormation>(
      this.api + '/log/' +id+ '/team_formation/', object
    );
  }

  update(id: number, object: TeamFormation): Observable<TeamFormation> {
    return this.http.put<TeamFormation>(
      this.api + '/log/' + id + '/team_formation/',
      object
    );
  }

  // deleteFormation(id: number): Observable<void>{
  //   return this.http.delete<void>(this.api + '/team_formation/delete/' + id);
  // }

  deleteFormationByUserAndTeam(idUser: number, idTeam: number): Observable<void>{
    return this.http.delete<void>(this.api + '/team_formation/delete/user/'+idUser+'/team/' + idTeam);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.api + '/team_formation/' + id);
  }
}
