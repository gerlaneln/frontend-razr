import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductScope } from 'src/app/models/product-scope.model';
import { Team } from 'src/app/models/team';
import { Upgrade } from 'src/app/models/upgrade';
import { User } from 'src/app/models/user';
import { ProductScopeService } from 'src/app/services/product-scope.service';
import { ProductService } from 'src/app/services/product.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UpgradeService } from 'src/app/services/upgrade.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styles: [
  ]
})
export class ProductViewComponent implements OnInit {

  constructor(
    private service: ProductService,
    private userService: UserService,
    private teamFormationService: team_formationService
  ) { }
  
  product: Product = <Product>{};
  products: Product[] = Array<Product>();
  productScopes: ProductScope[] = Array<ProductScope>();
  upgrades: Upgrade[] = Array<Upgrade>();
  upgrade: Upgrade = <Upgrade>{};
  user: User = <User>{};
  teams: Team[] = Array<Team>();
  
  id: number = 0;
  loggedUser: number = 0;
  
  @Output() insertScopeProduct = new EventEmitter<Product>();
  insertScope(product: Product){
    this.product = product;
    this.insertScopeProduct.emit(product);
  }
  
  @Output() insertUpgradeProduct = new EventEmitter<Product>();
  insertUpgrade(product: Product){
    this.product = product;
    this.insertUpgradeProduct.emit(product);
  }

  getProduct(): void{
    this.service.getAll().subscribe({
      next: (res: Product[]) => {
        this.products = res;
      }
    })
  }
    
  verifyCredentials(idTeam: number):boolean{
    let aux = 0;
    this.teams.forEach(team => {
      if(team.id == idTeam){
        aux++;
      }
    })
    if(aux > 0){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    if(this.loggedUser && this.loggedUser > 0){
      this.userService.getById(+this.loggedUser).subscribe({
        next: (res: User) => {
          this.user = res;
          this.teamFormationService.getByUser(this.user.id).subscribe({
            next: (res: Team[]) => {
              if(res.length != 0){
                this.teams = res;
                this.getProduct();
              }
              else{
                this.getProduct();
              }
            }
          })
        }
      })
    }

    const options = {};
    
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal, options);

    const tooltip = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltip, options);

  }

}
