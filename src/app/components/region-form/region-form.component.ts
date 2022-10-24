import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Region } from 'src/app/models/region';
import { RegionService } from 'src/app/services/region.service';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { Utils } from 'src/app/utils/utils';
import { Team } from 'src/app/models/team';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styles: [],
})
export class RegionFormComponent implements OnInit, OnChanges {
  constructor(
    private service: RegionService,
    private toastrService: ToastrService,
    private userService: UserService,
    private teamFormationService: team_formationService
  ) {}
  /*
      User service, teamformationService to use in user permission
    */
  loggedUser: number = 0;
  region: Region = <Region>{};
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
    Id is sent from the region-view output to the input.
    Everytime the value of id is updated (everytime he's emitted from the modal call on region-view),
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
        next: (res: Region) => {
          this.region = res;
        },
      });
    } else {
      this.region = <Region>{};
    }
  }

  /*
    The submit function also checks what user is logged, so the backend can assign the changes on the log
  */
  submit(form: NgForm): void {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (this.region.id) {
      this.service.update(this.loggedUser, this.region).subscribe({
        complete: () => {
          form.resetForm();
          this.region = <Region>{};
          this.toastrService.success('Region edited!', 'Success');
        },
      });
    } else {
      this.service.insert(this.loggedUser, this.region).subscribe({
        complete: () => {
          form.resetForm();
          this.region = <Region>{};
          this.toastrService.success('Region assigned!', 'Success');
        },
      });
    }
  }

  /*
    Select has to be initializated
  */
  ngOnInit(): void { 
    this.get();
    const select = document.querySelectorAll('select');
    const options = {};
    M.FormSelect.init(select, options);

    this.edit(this.id);

    /*
      Field validation
    */

    let validate = new JustValidate('#region-form');

    validate.addField('#region-name', [
      {
        rule: 'required' as Rules,
        errorMessage: 'This field cannot be empty',
      },
    ]);
  }
}
