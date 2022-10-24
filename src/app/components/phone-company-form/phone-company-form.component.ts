import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneCompany } from 'src/app/models/phone-company.model';
import { Region } from 'src/app/models/region';
import { PhoneCompanyService } from 'src/app/services/phone-company.service';
import { RegionService } from 'src/app/services/region.service';
import { Utils } from 'src/app/utils/utils';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { team_formationService } from 'src/app/services/team-formation.service';
import { User } from 'src/app/models/user';
import { Team } from 'src/app/models/team';


@Component({
  selector: 'app-phone-company-form',
  templateUrl: './phone-company-form.component.html',
  styles: [
  ]
})
export class PhoneCompanyFormComponent implements OnInit,OnChanges {
  
  constructor(
    private service: PhoneCompanyService,
    private regionService: RegionService,
    private toastrService: ToastrService,
    private userService: UserService,
    private teamFormationService: team_formationService
  ) { }
   /*
      User service, teamformationService to use in user permission
    */
  compareById = Utils.compareById;
  company: PhoneCompany = <PhoneCompany>{};
  region: Region[] = Array<Region>();
  loggedUser: number = 0;
  
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
    Id is sent from the phone-company-view output to the input.
    Everytime the value of id is updated (everytime he's emitted from the modal call on phone-company-view),
    the edit function is called (ngOnChanges) to search for the entity with this id on the database.
  */
  
  @Input() id: number = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.edit(this.id);
  }

  edit(id: number){
    this.id = id;
    if(this.id > 0){
      this.service.getById(+this.id).subscribe({
        next: (res: PhoneCompany) => {
          this.company = res;
        }
      });
    }else{
      this.company = <PhoneCompany>{};
    }
  }

  /*
    The submit function also checks what user is logged, so the backend can assign the changes on the log
  */
  submit(form: NgForm):void{
    if(typeof(this.company.isMV) === 'undefined'){
      this.company.isMV = false;
    }

    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (this.company.id) {
      this.service.update(this.loggedUser, this.company).subscribe({
        complete: () => {
          form.resetForm();
          this.company = <PhoneCompany>{};
          this.toastrService.success('Company edited!', 'Success');
        }
      });
    } else {
      this.service.insert(this.loggedUser, this.company).subscribe({
        complete: () => {
          form.resetForm();
          this.company = <PhoneCompany>{};
          this.toastrService.success('Company assigned!', 'Success');
        }
      });
    }
  }

  /*
    Select has to be initializated
  */
  ngOnInit(): void {
    this.get();
    this.regionService.getAll().subscribe({
      next: (resposta: Region[]) => {
        this.region = resposta;
      }
    });
    const elem = document.querySelectorAll('select');
    const options = {};
    M.FormSelect.init(elem, options);

    /*
      Field validation
    */
   
    let validate = new JustValidate("#phone-company-form")

    validate
    .addField("#company-name", [
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ])
    .addField("#region", [
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ])
  }

}
