import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { team_formationService } from 'src/app/services/team-formation.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styles: [
  ]
})
export class TeamViewComponent implements OnInit {

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private teamFormationService: team_formationService
  ) { }

  user: User = <User>{};
  teams: Team[] = Array<Team>();
  open: boolean = false;
  collapseString: string = "";

  get(): void{
    /*
      Get the teams that are assigned to that user
    */
    this.userService.getById(JSON.parse(sessionStorage.getItem('user') || '{}')).subscribe({
      next: (res: User) => {
        this.user = res;
        this.teamFormationService.getByUser(res.id).subscribe({
          next: (res: Team[]) => {
            this.teams = res;
          } 
        })
      }
    })
  }

  collapse():void{
    if(this.open == true){
      this.open = false;
      this.collapseString = "close";
    }else{
      this.open = true;
      this.collapseString = "expand";
    }
  }

  ngOnInit(): void {
    const options = {};
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, options);
    const tooltip = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltip, options);

    this.get();
  }

}
