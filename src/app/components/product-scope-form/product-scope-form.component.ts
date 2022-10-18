import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Distribuition } from 'src/app/models/distribuition.model';
import { Product } from 'src/app/models/product';
import { ProductScope } from 'src/app/models/product-scope.model';
import { DistribuitionModelService } from 'src/app/services/distribuition-model.service';
import { ProductScopeService } from 'src/app/services/product-scope.service';
import { ProductService } from 'src/app/services/product.service';
import { Utils } from 'src/app/utils/utils';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-scope-form',
  templateUrl: './product-scope-form.component.html',
  styles: [
  ]
})
export class ProductScopeFormComponent implements OnInit, OnChanges {

  constructor(
    private service: ProductScopeService,
    private productService: ProductService,
    private modelService: DistribuitionModelService,
    private toastrService: ToastrService

  ) { }

  /*
    Static list of Android Operational Systems
  */
  so: String[] = ['Android 10 - Quince Tart',
    'Android 11	- Red Velvet Cake',
    'Android 12 -	Snow Cone',
    'Android 12L -	Snow Cone v2',
    'Android 13 -	Tiramisu'
  ];

  compareByName = Utils.compareByName;
  compareById = Utils.compareById;

  loggedUser: number = 0;

  // product: Product = <Product>{};
  productScope: ProductScope = <ProductScope>{};
  models: Distribuition[] = Array<Distribuition>();

  /* 
    Id is sent from the product-view output to the input.
    Everytime the value of id is updated (everytime he's emitted from the modal call on product-view),
    the edit function is called (ngOnChanges) to search for the entity with this id on the database.
  */

  ngOnChanges(changes: SimpleChanges): void {
    this.getProduct(this.product);
  }

  @Input() product: Product = <Product>{};

  getProduct(product: Product) {
    this.product = product;
    if(this.product.id > 0){
      this.service.getByProduct(this.product.id).subscribe({
        next: (res: ProductScope) => {
          if (res) {
            this.productScope = res;
          }
        }
      })
    }else {
      this.productScope = <ProductScope>{};
    }
  }

  /*
    The submit function also checks what user is logged, so the backend can assign the changes on the log
  */
  submit(form: NgForm): void {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.productScope.product = this.product;
    console.log(this.productScope.product);
    console.log(this.productScope);
    if(this.productScope.id){
      this.service.update(this.loggedUser, this.productScope).subscribe({
        next: (res: ProductScope) => {
          form.resetForm();
          this.toastrService.success('Scope assigned!', 'Success');
        }
      })
    }else{
      this.service.insert(this.loggedUser, this.productScope).subscribe({
        next: (res: ProductScope) => {
          form.resetForm();
          this.toastrService.success('Scope assigned!', 'Success');
        }
      })
    }
  }

  ngOnInit(): void {
    /*
      Select and TextArea has to be initializated
    */
    const select = document.querySelectorAll('select');
    const options = {};
    M.FormSelect.init(select, options);

    const textArea = document.querySelectorAll('textarea');
    M.CharacterCounter.init(textArea);

    this.modelService.getAll().subscribe({
      next: (res: Distribuition[]) => {
        this.models = res;
      }
    })

    /*
      Field validation
    */

    let validate = new JustValidate('#product-scope-form');

    validate
      .addField("#so-select", [
        {
          rule: 'required' as Rules,
          errorMessage: "This field cannot be empty"
        }
      ])

  }


}
