import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styles: [
  ]
})
export class UserViewComponent implements OnInit {

  constructor(
    private service: UserService,
    private teamFormationService: team_formationService
  ) { }
  
  id: number = 0;
  users: User[] = Array<User>();

  /*
    Output that emits the id to User-Form
  */
  
  @Output() editModel = new EventEmitter<number>();
  
  edit(id: number){
    this.id = id;
    this.editModel.emit(this.id);
  }
  
  get(): void {
    this.service.get().subscribe({
      next: (res: User[]) => {
        this.users = res;
      }
    });
  }
  user: User = <User>{};
  teams: Team[] = Array<Team>(); 
  get1(): void{
    /*
      Get the teams that are assigned to that user
    */
    this.service.getById(JSON.parse(sessionStorage.getItem('user') || '{}')).subscribe({
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
