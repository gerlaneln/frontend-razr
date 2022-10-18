import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/utils/utils';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { Team } from 'src/app/models/team';
import { team_formationService } from 'src/app/services/team-formation.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
})
export class UserFormComponent implements OnInit, OnChanges {
  constructor(
    private service: UserService,
    private teamFormationService: team_formationService
  ) {}
  
  compareByName = Utils.compareByName;
  
  loggedUser: number = 0;
  
  user: User = <User>{};
  user1: User = <User>{};
  password: string = '';
  passwordEdit: string = '';
  teams: Team[] = Array<Team>(); 
  get(): void{
    /*
      Get the teams that are assigned to that user
    */
    this.service.getById(JSON.parse(sessionStorage.getItem('user') || '{}')).subscribe({
      next: (res: User) => {
        this.user1 = res;
        this.teamFormationService.getByUser(res.id).subscribe({
          next: (res: Team[]) => {
            this.teams = res;
          } 
        })
      }
    })
  } 

  /* 
    Id is sent from the user-form output to the input.
    Everytime the value of id is updated (everytime he's emitted from the modal call on user-form),
    the edit function is called (ngOnChanges) to search for the entity with this id on the database.
  */

  ngOnChanges(changes: SimpleChanges): void {
    this.edit(this.id);
  }

  @Input() id: number = 0;

  edit(id: number) {
    this.id = id;
    if (this.id > 0) {
      this.passwordEdit = 'Password does not appear for security measures';
      this.service.getById(+this.id).subscribe({
        next: (res: User) => {
          this.user = res;
        },
      });
    } else {
      this.passwordEdit = '';
      this.user = <User>{};
    }
  }

  submit(form: NgForm): void {
    if(typeof(this.user.active) === 'undefined'){
      this.user.active = false;
    }
    // if (this.password) {
      // if (this.password.match(this.user.password)) {
        this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
        this.service.insert(this.loggedUser, this.user).subscribe({
          complete: () => {
            form.resetForm();
          },
        });
      // } else {
      //   confirm('Password does not match');
      // }
    // } else {
    //   this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    //   this.service.insert(this.loggedUser, this.user).subscribe({
    //     complete: () => {
    //       form.resetForm();
    //     },
    //   });
    // }
  }

  /*
    Select has to be initializated
  */
  ngOnInit(): void {
    this.get()
    const select = document.querySelectorAll('select');
    const options = {};
    M.FormSelect.init(select, options);

    this.edit(this.id);

    /*
      Field validation
    */

    let validate = new JustValidate('#user-form');

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
          errorMessage: 'Passwords should be the same',
        },
      ]).addField("#role-select",[
        {
          rule: 'required' as Rules
        }
      ])
      ;
  }
}
