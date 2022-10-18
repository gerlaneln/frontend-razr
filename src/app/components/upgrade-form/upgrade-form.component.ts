import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { Upgrade } from 'src/app/models/upgrade';
import { ProductService } from 'src/app/services/product.service';
import { UpgradeService } from 'src/app/services/upgrade.service';

@Component({
  selector: 'app-upgrade-form',
  templateUrl: './upgrade-form.component.html',
  styles: [
  ]
})
export class UpgradeFormComponent implements OnInit, OnChanges {

  constructor(
    private service: UpgradeService,
    private productService: ProductService,
    private toastrService: ToastrService
  ) { }

  loggedUser: number = 0;
  upgrade: Upgrade = <Upgrade>{};

  /* 
    Id is sent from the product-form output to the input.
    Everytime the value of id is updated (everytime he's emitted from the modal call on product-form),
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
        next: (res: Upgrade) => {
          if (res) {
            this.upgrade = res;
          }
        }
      })
    }else {
      this.upgrade = <Upgrade>{};
    }
  }

  /*
    The submit function also checks what user is logged, so the backend can assign the changes on the log
  */
  submit(form: NgForm): void {
    let rDate = new Date(this.upgrade.releaseDate);
    rDate = new Date(rDate.getTime() + rDate.getTimezoneOffset() * 60 * 1000);
    this.upgrade.releaseDate = rDate.toISOString();

    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.upgrade.product = this.product;
    if(this.upgrade.id){
      this.service.update(this.loggedUser, this.upgrade).subscribe({
        complete: () => {
          form.resetForm();
          this.toastrService.success('Upgrade edited!', 'Success');
        }
      });
    }else{
      this.service.insert(this.loggedUser, this.upgrade).subscribe({
        complete: () => {
          form.resetForm();
          this.toastrService.success('Upgrade assigned!', 'Success');
        },
      });
    }
  }

  /*
    TextArea has to be initializated
  */
  ngOnInit(): void {
    const textArea = document.querySelectorAll('textarea');
    M.CharacterCounter.init(textArea);

    if(typeof(this.product) !== 'undefined'){
      this.getProduct(this.product);
    }

    /*
      Field validation
    */

    let validate = new JustValidate('#upgrade-form');

    validate.addField("#upgrade-type", [
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ]).addField("#release-date", [
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ]

    )
  }

}
