import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PhoneCompany } from 'src/app/models/phone-company.model';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { PhoneCompanyService } from 'src/app/services/phone-company.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-phone-company-view',
  templateUrl: './phone-company-view.component.html',
  styles: [
  ]
})
export class PhoneCompanyViewComponent implements OnInit {

  constructor(private service: PhoneCompanyService,private userService: UserService,
    private teamFormationService: team_formationService) { }

  id: number = 0;
  company: PhoneCompany[]  = Array<PhoneCompany>();

  /*
    Output that emits the id to phone-company-form
  */

  @Output() editPhoneCompany = new EventEmitter<number>();

  edit(id: number){
    this.id = id;
    this.editPhoneCompany.emit(id);
  }

  get(): void {
    this.service.getAll().subscribe({
      next: (res: PhoneCompany[]) => {
        this.company = res;
        console.log(this.company)
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
