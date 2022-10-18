import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Distribuition } from 'src/app/models/distribuition.model';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { DistribuitionModelService } from 'src/app/services/distribuition-model.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dist-model-view',
  templateUrl: './dist-model-view.component.html',
  styles: [
  ]
})
export class DistModelViewComponent implements OnInit {

  constructor(
    private service: DistribuitionModelService,private userService: UserService,
    private teamFormationService: team_formationService
  ) { }

  id: number = 0;
  models: Distribuition[] = Array<Distribuition>();
  
  /*
    Output that emits the id to Dist-Model-Form
  */

  @Output() editModel = new EventEmitter<number>();
  
  edit(id: number){
    this.id = id;
    this.editModel.emit(id);
  }

  get(): void{
    this.service.getAll().subscribe({
      next: (res: Distribuition[]) => {
        this.models = res;
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
    Creates arrays to provide dynamic columns on model table
  */
  createRange(number: number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  /*
    Modal has to be initialiized
  */
  ngOnInit(): void {
    const modal = document.querySelectorAll('.modal');
    const options = {};
    M.Modal.init(modal, options);

    this.get();
    this.get1();
  }

}
