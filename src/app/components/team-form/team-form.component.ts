import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/models/team';
import { TeamFormation } from 'src/app/models/team-formation.model';
import { User } from 'src/app/models/user';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/utils/utils';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styles: [],
})
export class TeamFormComponent implements OnInit, OnChanges {
  constructor(
    private userService: UserService,
    private service: team_formationService,
    private toastrService: ToastrService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.teamAssignment(this.team);
  }

  compareById = Utils.compareById;

  loggedUser: number = 0;

  teams: Team[] = Array<Team>();
  usersTeam: User[] = Array<User>();
  teamFormation: TeamFormation = <TeamFormation>{};
  users: User[] = Array<User>();
  user: User = <User>{};
  oneUserTeam: boolean = false;

  getUser(): void{
    /*
      Get the teams that are assigned to that user
    */
    this.userService.getById(JSON.parse(sessionStorage.getItem('user') || '{}')).subscribe({
      next: (res: User) => {
        this.user = res;
      }
    })
  }

  /* 
    Team is sent from the product-form output to the input.
    Everytime the value of id is updated (everytime he's emitted from the modal call on product-form),
    the edit function is called (ngOnChanges) to search for the entity with this id on the database.
  */

  // @Input() idTeam: number = 0;
  @Input() team: Team = <Team>{};

  teamAssignment(team: Team) {
    this.team = team;
  }

  /*
    insertOnTeam controlls the list of users that are going to be assigned to the team
  */
  insertOnTeam(user: User): void {
    this.usersTeam.push(user);
    if(this.usersTeam.length > 1){
      this.oneUserTeam = false;
    }else{
      this.oneUserTeam = true;
    }
  }

  /*
    deleteFromTeam takes users from the list of those who are going to be assigned
    to the team
  */
 
  deleteFromTeam(user: User, index: number): void {
    let removedItem = this.usersTeam.splice(index, 1);
  }

  getUsers(): void {
    this.userService.get().subscribe({
      next: (res: User[]) => {
        this.users = res;
      },
    });
  }

  /*
    The submit function also checks what user is logged, so the backend can assign the changes on the log
  */
  submit(form: NgForm): void {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.teamFormation.team = this.team;
    this.usersTeam.forEach((user) => {
      this.teamFormation.user = user;
      this.service.insert(this.loggedUser, this.teamFormation).subscribe({
        complete: () => {
          // form.resetForm();
          this.toastrService.success('Team assigned!', 'Success');
        },
      });
    });
  }

  ngOnInit(): void {
    this.getUsers();

    /*
      Field validation
    */

    let validate = new JustValidate('#team-form');

    validate
      .addField('#team-select', [
        {
          rule: 'required' as Rules,
        },
      ])
      .addField('#team-user-select', [
        {
          rule: 'required' as Rules,
        },
      ]);
  }
}
