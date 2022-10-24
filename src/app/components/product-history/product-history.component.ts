import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { History } from 'src/app/models/history';
import { Product } from 'src/app/models/product';
import { HistoryService } from 'src/app/services/history.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styles: [
  ]
})
export class ProductHistoryComponent implements OnInit, OnChanges {

  constructor(
    private historyService: HistoryService
  ) { }
  
  stories: History[] = Array<History>();

  history: History = <History>{};

  @Input() product: Product = <Product>{};
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.product.id > 0){
      this.getHistory(this.product.id);
    }
  }

  getHistory(id: number){
    this.historyService.getAllByDateDesc(id).subscribe({
      next: (res: History[]) => {
        if(res.length > 0){
          this.stories = res;
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
