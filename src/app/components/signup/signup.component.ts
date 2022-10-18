import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { IcomponentSignup } from 'src/app/components/icomponent-signup';
import { LoginService } from 'src/app/services/login.service';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, IcomponentSignup<User> {
  constructor(
    private service: UserService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  register: User = <User>{};

  password: string = '';

  id: number = 1;

  submit(form: NgForm): void {
    /*
      If both of the password fields match, user is set to active, with different roles,
      dependending  on the name
    */
    if (this.password.match(this.register.password)) {
      this.register.active = true;
      if(this.register.name.match("Administrator")){
        this.register.userRole = 'ADMIN';
      }else{
        this.register.userRole = 'USER';
      }
      this.service.signUpUser(this.register).subscribe({
        complete: () => {
          form.resetForm();
          this.toastrService.success(
            'Account successfully created',
            'Sign up'
          );
        },
      });
    } else {
      this.toastrService.error('Password does not match!', 'Error');
    }
  }

  ngOnInit(): void {
    /*
      Field validation
    */
    let validate = new JustValidate('#sign-up-form');
    validate
      .addField('#name', [
        {
          rule: 'required' as Rules,
          errorMessage: 'Field name is required',
        },
      ])
      .addField('#email', [
        {
          rule: 'email' as Rules,
          errorMessage: 'Invalid email format',
        },
      ])
      .addField('#username', [
        {
          rule: 'required' as Rules,
          value: 20,
          errorMessage: 'Field username is required',
        },
      ])
      .addField('#password', [
        {
          rule: 'required' as Rules,
          errorMessage: 'Field password is required',
        },
      ])
      .addField('#cpassword', [
        {
          rule: 'required' as Rules,
          errorMessage: 'You must confirm your password',
        },
        {
          validator: (value, fields) => {
            if (fields['#password'] && fields['#password'].elem) {
              const repeatPasswordValue = fields['#password'].elem.value;
              return value === repeatPasswordValue;
            }
            return true;
          },
          errorMessage: 'Password should be the same',
        },
      ]);
  }
}
