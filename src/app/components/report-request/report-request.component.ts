import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductScope } from 'src/app/models/product-scope.model';
import { Upgrade } from 'src/app/models/upgrade';
import { User } from 'src/app/models/user';
import { ProductScopeService } from 'src/app/services/product-scope.service';
import { ProductService } from 'src/app/services/product.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UpgradeService } from 'src/app/services/upgrade.service';

@Component({
  selector: 'app-report-request',
  templateUrl: './report-request.component.html',
  styles: [
  ]
})
export class ReportRequestComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  firstDate: string = '';
  secondDate: string = '';

  document: boolean = false;
  empty: boolean = false;

  usersTeam: User[] = Array<User>();
  product: Product = <Product>{};
  products: Product[] = Array<Product>();
  teamUsers: User[] = Array<User>();
  productScope: ProductScope = <ProductScope>{};
  upgrade: Upgrade = <Upgrade>{};

  @Output() teamViewByProduct = new EventEmitter<Product>();
  getTeam(product: Product){
    this.product = product;
    this.teamViewByProduct.emit(product);
  }

  @Output() upgradeByProduct = new EventEmitter<Product>();
  getUgrade(product: Product){
    this.product = product;
    this.upgradeByProduct.emit(product);
  }

  @Output() scopeByProduct = new EventEmitter<Product>();
  getScope(product: Product){
    this.product = product;
    this.scopeByProduct.emit(product);
  }

  submit(form: NgForm): void {

    let dateOne = new Date(this.firstDate);
    dateOne = new Date(dateOne.getTime() + dateOne.getTimezoneOffset() * 60 * 1000);
    this.firstDate = dateOne.toISOString().slice(0, 10);

    let dateTwo = new Date(this.secondDate);
    dateTwo = new Date(dateTwo.getTime() + dateTwo.getTimezoneOffset() * 60 * 1000);
    this.secondDate = dateTwo.toISOString().slice(0, 10);

    this.productService.getReport(this.firstDate, this.secondDate).subscribe({
      next: (res: Product[]) => {
        if(res.length > 0){
          this.document = true;
          this.products = res;
        }else{
          this.empty = true;
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
