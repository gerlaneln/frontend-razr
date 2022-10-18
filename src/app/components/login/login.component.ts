import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: LoginService
  ) { }

  user: User = <User>{};
  load: boolean = false;
  
  submit(form: NgForm): void{
    this.service.login(this.user);
    this.load = true;
    form.resetForm();
  }

  ngOnInit(): void {
  }

}
