import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/models/team';
import { TeamFormation } from 'src/app/models/team-formation.model';
import { User } from 'src/app/models/user';
import { team_formationService } from 'src/app/services/team-formation.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-team-delete',
  templateUrl: './user-team-delete.component.html',
  styles: [
  ]
})
export class UserTeamDeleteComponent implements OnInit, OnChanges {

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private teamFormationService: team_formationService,
    private toastrService: ToastrService
  ) { }

  team: Team = <Team>{};
  user: User = <User>{};
  teamFormation: TeamFormation = <TeamFormation>{};
  
  @Input() idTeam: number = 0;
  @Input() idUser: number = 0;

  noDelete: boolean = false;
  deleted: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.noDelete = false;
    this.deleted = false;
    this.getUser(this.idUser);
    this.getTeam(this.idTeam);
  }

  getUser(idUser: number): void{
    if(idUser > 0){
      this.userService.getById(idUser).subscribe({
        next: (res: User) => {
          this.user = res;
        }
      })
    }
  }
  
  getTeam(idTeam: number){
    if(idTeam > 0){
      this.teamService.getById(idTeam).subscribe({
        next: (res: Team) => {
          this.team = res;
        }
      })
    }
  }

  cancelDelete(){
    this.noDelete = true;
  }

  deleteFormationByUserAndTeam(idUser: number, idTeam: number): void {
    this.teamFormationService.deleteFormationByUserAndTeam(idUser, idTeam).subscribe({
      next: () => {
        this.deleted = true;
        this.toastrService.success('User deleted!', 'Success');
      }
    });
  }

  ngOnInit(): void {
  }

}
