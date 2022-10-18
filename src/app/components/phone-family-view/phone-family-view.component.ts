import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductFamily } from 'src/app/models/product-family.model';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { ProductFamilyService } from 'src/app/services/product-family.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-phone-family-view',
  templateUrl: './phone-family-view.component.html',
  styles: [
  ]
})
export class PhoneFamilyViewComponent implements OnInit {

  constructor( private service : ProductFamilyService,private userService: UserService,
    private teamFormationService: team_formationService
    ) { }

  id: number = 0;
  phonefamily: ProductFamily[] = Array<ProductFamily>();

  /*
    Output that emits the id to Phone-Family-Form
  */
  @Output() editPhoneCompany = new EventEmitter<number>();

  edit(id: number){
    this.id = id;
    this.editPhoneCompany.emit(id);
  }

  get(): void {
    this.service.getAll().subscribe({
      next: (res: ProductFamily[]) => {
        this.phonefamily = res;
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
