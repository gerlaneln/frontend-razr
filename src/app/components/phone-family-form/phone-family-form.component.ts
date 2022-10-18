import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ProductFamily } from 'src/app/models/product-family.model';
import { ProductFamilyService } from 'src/app/services/product-family.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { User } from 'src/app/models/user';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-phone-family-form',
  templateUrl: './phone-family-form.component.html',
  styles: [],
})
export class PhoneFamilyFormComponent implements OnInit, OnChanges {

  constructor(
    private service: ProductFamilyService,
    private toastrService: ToastrService,
    private userService: UserService,
    private teamFormationService: team_formationService
  ) {}
  /*
      User service, teamformationService to use in user permission
    */
  loggedUser: number = 0;

  product: ProductFamily = <ProductFamily>{};

  /* 
    Id is sent from the phone-family-view output to the input.
    Everytime the value of id is updated (everytime he's emitted from the modal call on phone-family-view),
    the edit function is called (ngOnChanges) to search for the entity with this id on the database.
  */

  ngOnChanges(changes: SimpleChanges): void {
    this.edit(this.id);
  }

  @Input() id: number = 0;

  edit(id: number) {
    this.id = id;
    if (this.id > 0) {
      this.service.getById(+this.id).subscribe({
        next: (res: ProductFamily) => {
          this.product = res;
        },
      });
    } else {
      this.product = <ProductFamily>{};
    }
  }
  user: User = <User>{};
  teams: Team[] = Array<Team>(); 
  get(): void{
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
    The submit function also checks what user is logged, so the backend can assign the changes on the log
  */
  submit(form: NgForm): void {
    if (this.product.id) {
      this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.service.update(this.loggedUser, this.product).subscribe({
        complete: () => {
          form.resetForm();
          this.toastrService.success('Family edited!', 'Success');
        }
      });
    } else {
      this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.service.insert(this.loggedUser, this.product).subscribe({
        complete: () => {
          form.resetForm();
          this.toastrService.success('Family assigned!', 'Success');
        },
      });
    }
  }

  ngOnInit(): void {
    this.get();
    this.edit(this.id);

    /*
      Field validation
    */

    let validate = new JustValidate('#product-family-form');
    validate.addField('#family-name', [
      {
        rule: 'required' as Rules,
        errorMessage: 'This field cannot be empty',
      },
    ]);
  }
}
