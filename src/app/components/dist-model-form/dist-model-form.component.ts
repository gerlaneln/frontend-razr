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
import { Distribuition } from 'src/app/models/distribuition.model';
import { PhoneCompany } from 'src/app/models/phone-company.model';
import { Region } from 'src/app/models/region';
import { DistribuitionModelService } from 'src/app/services/distribuition-model.service';
import { PhoneCompanyService } from 'src/app/services/phone-company.service';
import { RegionService } from 'src/app/services/region.service';
import { Utils } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { team_formationService } from 'src/app/services/team-formation.service';
import { UserService } from 'src/app/services/user.service';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dist-model-form',
  templateUrl: './dist-model-form.component.html',
  styles: [],
})
export class DistModelFormComponent implements OnInit, OnChanges {
  constructor(
    private service: DistribuitionModelService,
    private regionService: RegionService,
    private companyService: PhoneCompanyService,
    private toastrService: ToastrService,
    private userService: UserService,
    private teamFormationService: team_formationService
  ) {}
  /*
      User service, teamformationService to use in user permission
    */
  regions: Region[] = Array<Region>();
  phoneCompanies: PhoneCompany[] = Array<PhoneCompany>();

  compareById = Utils.compareById;
  
  loggedUser: number = 0;
  
  model: Distribuition = <Distribuition>{};
  user: User = <User>{};
  teams: Team[] = Array<Team>(); 

  getUser(): void{
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
    Id is sent from the dist-model-view output to the input.
    Everytime the value of id is updated (everytime he's emitted from the modal call on dist-model-view),
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
        next: (res: Distribuition) => {
          this.model = res;
        },
      }
      );
    } else {
      this.model = <Distribuition>{};
    }
  }

  /*
    Only Phone Companies from that Region can be acessed
  */
  getPhoneCompanies(region: Region):void{
    if(region != null){
      this.companyService.getByRegion(region.id).subscribe({
        next: (res: PhoneCompany[]) => {
          if(res.length > 0){
            this.phoneCompanies = res;
          }
        }
      })
    }
  }

  submit(form: NgForm): void {
    /*
      The submit function also checks what user is logged, so the backend can assign the changes on the log
    */

    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    if(this.model.id){
      this.service.update(this.loggedUser, this.model).subscribe({
        complete: () => {
          form.resetForm();
          this.model = <Distribuition>{};
          this.toastrService.success('Model edited!', 'Success');
        },
      });
    }else{
      this.service.insert(this.loggedUser, this.model).subscribe({
        complete: () => {
          form.resetForm();
          this.model = <Distribuition>{};
          this.toastrService.success('Model assigned!', 'Success');
        },
      });
    }
  }
  
  /*
    Select has to be initializated
  */
  ngOnInit(): void {
    this.getUser();
    const select = document.querySelectorAll('select');
    const options = {};
    M.FormSelect.init(select, options);
    this.regionService.getAll().subscribe({
      next: (res: Region[]) => {
        this.regions = res;
      }
    });

    this.edit(this.id);

    /*
      Field validation
    */

    let validate = new JustValidate('#model-form');

    validate
      .addField('#model-name', [
        {
          rule: 'required' as Rules,
          errorMessage: 'This field cannot be empty',
        },
      ])
      .addField('#personnel', [
        {
          rule: 'required' as Rules,
          errorMessage: 'This field cannot be empty',
        },
      ])
      .addField('#before-ta', [
        {
          rule: 'required' as Rules,
          errorMessage: 'This field cannot be empty',
        },
      ])
      .addField('#after-ta', [
        {
          rule: 'required' as Rules,
          errorMessage: 'This field cannot be empty',
        },
      ])
      .addField('#region-select', [
        {
          rule: 'required' as Rules,
        },
      ]);
  }
}
