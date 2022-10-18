import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chipset } from 'src/app/models/chipset.model';
import { ChipsetService } from 'src/app/services/chipset.service';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { User } from 'src/app/models/user';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-chipset-form',
  templateUrl: './chipset-form.component.html',
  styles: [],
})

export class ChipsetFormComponent implements OnInit, OnChanges {
  constructor(
    private service: ChipsetService,
    private toastrService: ToastrService,
    private userService: UserService,
    private teamFormationService: team_formationService
  ) {}
  /*
      User service, teamformationService to use in user permission
    */
  loggedUser: number = 0;
  chip: Chipset = <Chipset>{};
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
    Id is sent from the chipset-view output to the input.
    Everytime the value of id is updated (everytime he's emitted from the modal call on chipset-view),
    the edit function is called (ngOnChanges) to search for the entity with this id on the database.
  */

  @Input() id: number = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.edit(this.id);
  }

  edit(id: number) {
    this.id = id;
    if (this.id > 0) {
      this.service.getById(+this.id).subscribe({
        next: (res: Chipset) => {
          this.chip = res;
        },
      });
    } else {
      this.chip = <Chipset>{};
    }
  }

  /*
    The submit function also checks what user is logged, so the backend can assign the changes on the log
  */

  submit(form: NgForm): void {
    if (this.chip.id) {
      this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.service.update(this.loggedUser, this.chip).subscribe({
        complete: () => {
          form.resetForm();
          this.toastrService.success('Chipset edited!', 'Success');
        }
      });
    } else {
      this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.service.insert(this.loggedUser, this.chip).subscribe({
        complete: () => {
          form.resetForm();
          this.toastrService.success('Chipset assigned!', 'Success');
        }
      });
    }
  }

  ngOnInit(): void {
    this.get();
    this.edit(this.id);

    /*
      Field validation
    */

    let validate = new JustValidate('#chipset-form');

    validate
      .addField('#manufacturer-name', [
        {
          rule: 'required' as Rules,
          errorMessage: 'This field cannot be empty',
        },
      ])
      .addField('#chipset-name', [
        {
          rule: 'required' as Rules,
          errorMessage: 'This field cannot be empty',
        },
      ]);
  }
}
