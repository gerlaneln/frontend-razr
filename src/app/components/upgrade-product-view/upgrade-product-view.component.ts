import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Upgrade } from 'src/app/models/upgrade';
import { UpgradeService } from 'src/app/services/upgrade.service';

@Component({
  selector: 'app-upgrade-product-view',
  templateUrl: './upgrade-product-view.component.html',
  styles: [
  ]
})
export class UpgradeProductViewComponent implements OnInit, OnChanges {

  constructor(
    private upgradeService: UpgradeService
  ) { }

  upgrade: Upgrade = <Upgrade>{};

  ngOnChanges(changes: SimpleChanges): void {
    this.getUpgrade(this.product);
  }

  @Input() product: Product = <Product>{};

  getUpgrade(product: Product){
    this.product = product;
    if(this.product.id > 0){
      this.upgradeService.getByProduct(product.id).subscribe({
        next: (res: Upgrade) => {
          if(res != null){
            this.upgrade = res;
          }
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
