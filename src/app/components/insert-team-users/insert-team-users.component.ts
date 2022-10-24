import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/models/team';
import { TeamFormation } from 'src/app/models/team-formation.model';
import { User } from 'src/app/models/user';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-insert-team-users',
  templateUrl: './insert-team-users.component.html',
  styles: [
  ]
})
export class InsertTeamUsersComponent implements OnInit, OnChanges {

  constructor(
    private userService: UserService,
    private service: team_formationService,
    private toastrService: ToastrService
  ) { }

  // Array with all users saved on the db
  allUsers: User[] = Array<User>();
  // Array with all users from the team
  usersOnTeam: User[] = Array<User>();
  // Array with all available users, used on the select component
  availableUsers: User [] = Array<User>();
  // Array with users that are going to be put on this team
  usersTeam: User[] = Array<User>();
  user: User = <User>{};
  loggedUser: number = 0;
  teamFormation: TeamFormation = <TeamFormation>{};
  oneUserTeam: boolean = false;
  savedTeam: boolean = false;

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

  @Input() team: Team = <Team>{};

  ngOnChanges(changes: SimpleChanges): void {
    this.teamAssignment(this.team);
  }

  teamAssignment(team: Team) {
    this.team = team;
    this.getUsers();
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

    getAllUsers():void{
      this.userService.get().subscribe({
        next: (res: User[]) => {
          this.allUsers = res;
        }
      });
    }

    getUsers(): void {
      this.availableUsers = [];
      if(this.team.id > 0){
        this.service.getByTeam(this.team.id).subscribe({
          next: (res: User[]) => {
            this.usersOnTeam = res;
            this.getAvailableUsers(this.allUsers, this.usersOnTeam);
          }
        })
      }
    }

    getAvailableUsers(allUsers: User[], usersOnTeam: User[]): User[]{
      this.availableUsers = [];
      allUsers.forEach(user => {
        let aux = 0;
        usersOnTeam.forEach(userOnTeam => {
          if(user.id === userOnTeam.id){
            aux++;
          }
        })
        if(aux == 0){
          this.availableUsers.push(user);
        }
      })
      return this.availableUsers;
    }

    submit(form: NgForm): void {
      this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.teamFormation.team = this.team;
      this.usersTeam.forEach((user) => {
        this.teamFormation.user = user;
        this.service.insert(this.loggedUser, this.teamFormation).subscribe({
          complete: () => {
            this.savedTeam = true;
            this.toastrService.success('Team assigned!', 'Success');
          },
        });
      });
    }

  ngOnInit(): void {
    const options = {};

    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal, options);

    this.getAllUsers();
    this.getUser();
    this.availableUsers = [];

    /*
      Field validation
    */

    let validate = new JustValidate('#insert-team-form');

    validate
      .addField('#team-user-select', [
        {
          rule: 'required' as Rules,
        },
      ]);
  }

}
