import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { team_formationService } from 'src/app/services/team-formation.service';

@Component({
  selector: 'app-users-team-view',
  templateUrl: './users-team-view.component.html',
  styles: [
  ]
})
export class UsersTeamViewComponent implements OnInit, OnChanges {

  constructor(
    private teamFormationService: team_formationService
  ) { }
  
  usersFromTeam: User[] = Array<User>();
  
  ngOnChanges(changes: SimpleChanges): void {
    this.getUsers(this.product);
  }

  @Input() product: Product = <Product>{};

  getUsers(product: Product){
    this.product = product;
    if(this.product.id > 0){
      this.teamFormationService.getByTeam(this.product.team.id).subscribe({
        next: (res: User[]) => {
          this.usersFromTeam = res;
          console.log(this.usersFromTeam);
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
