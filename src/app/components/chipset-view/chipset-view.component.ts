import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Chipset } from 'src/app/models/chipset.model';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { ChipsetService } from 'src/app/services/chipset.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chipset-view',
  templateUrl: './chipset-view.component.html',
  styles: [
  ]
})
export class ChipsetViewComponent implements OnInit {

  constructor(private service: ChipsetService,private userService: UserService,
    private teamFormationService: team_formationService) { }

  id: number = 0;
  chip: Chipset[] = Array<Chipset>();

  /*
    Output that emits the id to Chipset-Form
  */

  @Output() editChipset = new EventEmitter<number>();

  edit(id: number){
    this.id = id;
    this.editChipset.emit(id);
  }

  get(): void {
    this.service.getAll().subscribe({
      next: (res: Chipset[]) => {
        this.chip = res;
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
    const modal = document.querySelectorAll('.modal');
    const options = {};
    M.Modal.init(modal, options);
    
    this.get();
    this.get1();
  }

}
