import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  private user: User = <User>{};
  private auth = false;

  authenticated(): boolean{
    return this.auth;
  }

  getUser(): User{
    return this.user;
  }

  getRole(): string {
    return this.user.userRole;
  }

  verifyLogin(): boolean{
    if(!this.authenticated()){
      this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
      if(Object.keys(this.user).length >= 0){
        this.auth = true;
      }else{
        this.router.navigate(['/login']);
      }
    }
    return this.authenticated();
  }

  login(user: User): void{
    this.user = user;
    const message = '';
    const credentials = btoa(user.username + ':' + user.password);
    const credentialsHttp = {
      headers : new HttpHeaders({
        'Authorization': 'Basic ' + credentials
      })
    }
    let url = environment.apiUrl + '/user_info/';
    this.http.get<User>(url, credentialsHttp).subscribe({
      next: (user: User) => {
        if(user){
          this.auth = true;
          this.user = user;
          sessionStorage.setItem('user', JSON.stringify(user.id));
          this.router.navigate(['/home']);
          this.toastrService.success('Successfully logged in!', 'Success');
        }
      },
      error: (err) => {
        console.log(err);
        this.auth = false;
        this.toastrService.error('Error at login, verify your information', 'Error');
      }
    })
  }

  logout():void{
    let url = environment.apiUrl + '/logout';
    this.http.get(url).subscribe({
      complete: () => {
        this.auth = false;
        this.user = <User>{};
        sessionStorage.setItem('user', JSON.stringify(null));
        this.router.navigate(['/login']);
      }
    })
  }
}
