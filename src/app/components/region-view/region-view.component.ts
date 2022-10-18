import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Region } from 'src/app/models/region';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { RegionService } from 'src/app/services/region.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-region-view',
  templateUrl: './region-view.component.html',
  styles: [
  ]
})
export class RegionViewComponent implements OnInit {

  constructor( private service: RegionService,private userService: UserService,
    private teamFormationService: team_formationService) { }

  id: number = 0;
  region: Region[] = Array<Region>();

  /*
    Output that emits the id to Region-Form
  */

  @Output() editRegion = new EventEmitter<number>();

  edit(id: number){
     this.id = id;
     this.editRegion.emit(id);
 }
  
  get(): void {
    this.service.getAll().subscribe({
      next: (res: Region[]) => {
        this.region = res;
      }
    });
  }
  user: User = <User>{};
  teams: Team[] = Array<Team>(); 
  get1(): void{
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

  /*
    Modal has to be initialiized
  */
  ngOnInit(): void {
    this.get();
    this.get1();
    const modal = document.querySelectorAll('.modal');
    const options = {};
    M.Modal.init(modal, options);
  }

}
