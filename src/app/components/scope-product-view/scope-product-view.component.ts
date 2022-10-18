import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductScope } from 'src/app/models/product-scope.model';
import { ProductScopeService } from 'src/app/services/product-scope.service';

@Component({
  selector: 'app-scope-product-view',
  templateUrl: './scope-product-view.component.html',
  styles: [
  ]
})
export class ScopeProductViewComponent implements OnInit, OnChanges {

  constructor(
    private scopeService: ProductScopeService
  ) { }

  productScope: ProductScope = <ProductScope>{};

  ngOnChanges(changes: SimpleChanges): void {
    this.getScope(this.product);
  }

  @Input() product: Product = <Product>{};

  getScope(product: Product){
    this.product = product;
    if(this.product.id > 0){
      this.scopeService.getByProduct(product.id).subscribe({
        next: (res: ProductScope) => {
          if(res != null){
            this.productScope = res;
          }
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
