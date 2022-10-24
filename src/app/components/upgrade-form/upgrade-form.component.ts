import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { Team } from 'src/app/models/team';
import { Upgrade } from 'src/app/models/upgrade';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UpgradeService } from 'src/app/services/upgrade.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upgrade-form',
  templateUrl: './upgrade-form.component.html',
  styles: [
  ]
})
export class UpgradeFormComponent implements OnInit, OnChanges {

  constructor(
    private service: UpgradeService,
    private userService: UserService,
    private toastrService: ToastrService,
    private teamFormationService: team_formationService
  ) { }

  loggedUser: number = 0;
  upgrade: Upgrade = <Upgrade>{};
  user: User = <User>{};
  teams: Team[] = Array<Team>();

  getUser(): void{
    /*
      Get the teams that are assigned to that user
    */
    this.userService.getById(JSON.parse(sessionStorage.getItem('user') || '{}')).subscribe({
      next: (res: User) => {
        this.user = res;
        this.teamFormationService.getByUser(this.user.id).subscribe({
          next: (res: Team[]) => {
            if(res.length != 0){
              this.teams = res;
            }
          }
        })
      }
    })
  }

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
          this.upgrade = <Upgrade>{};
          this.toastrService.success('Upgrade edited!', 'Success');
        }
      });
    }else{
      this.service.insert(this.loggedUser, this.upgrade).subscribe({
        complete: () => {
          form.resetForm();
          this.upgrade = <Upgrade>{};
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

    this.getUser();

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
