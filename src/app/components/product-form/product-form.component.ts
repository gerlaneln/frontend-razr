import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chipset } from 'src/app/models/chipset.model';
import { LifeCycleStatus } from 'src/app/models/life-cycle-status.model';
import { Product } from 'src/app/models/product';
import { ProductFamily } from 'src/app/models/product-family.model';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { ChipsetService } from 'src/app/services/chipset.service';
import { LifeCycleStatusService } from 'src/app/services/life-cycle-status.service';
import { ProductFamilyService } from 'src/app/services/product-family.service';
import { ProductService } from 'src/app/services/product.service';
import { TeamService } from 'src/app/services/team.service';
import { Utils } from 'src/app/utils/utils';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { team_formationService } from 'src/app/services/team-formation.service';
import { ToastrService } from 'ngx-toastr';
import { buffer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent implements OnInit, OnChanges {

  constructor(
    private service: ProductService,
    private familyService: ProductFamilyService,
    private chipsetService: ChipsetService,
    private cycleService: LifeCycleStatusService,
    private teamService: TeamService,
    private teamFormationService: team_formationService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }
  
  /*
    Static list of broadbands
  */
  broadband: String[] = ['4G','5G'];

  compareByName = Utils.compareByName;
  compareById = Utils.compareById;

  loggedUser: number = 0;

  product: Product = <Product>{};
  families: ProductFamily[] = Array<ProductFamily>();
  chipsets: Chipset[] = Array<Chipset>();
  status: LifeCycleStatus[] = Array<LifeCycleStatus>();
  user: User = <User>{};
  team: Team = <Team>{};
  idTeam: number = 0;
  idProduct: number = 0;
  teams: Team[] = Array<Team>();
  usersTeam: User[] = Array<User>();
  hasTeam : boolean = false;
  changeTeamName: boolean = false;
  oneUserTeam: boolean = false;

  teamModal:any; 
  
  getFamily(): void{
    this.familyService.getAll().subscribe({
      next: (res: ProductFamily[]) => {
        this.families = res;
      }
    });
  }

  getChipset(): void{
    this.chipsetService.getAll().subscribe({
      next: (res: Chipset[]) => {
        this.chipsets = res;
      }
    });
  }

  getStatus(): void{
    this.cycleService.getAll().subscribe({
      next: (res: LifeCycleStatus[]) => {
        this.status = res;
      }
    });
  }
  
  /* 
    The team of this product is emitted to team-form. Before he's created with the product name.
  */
  @Output() productTeam = new EventEmitter<Team>();
  
  insertTeam():void{
    if(typeof(this.product.name) !== "undefined"){
      this.team.name = this.product.name;
      this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.teamService.insert(this.loggedUser, this.team).subscribe({
        next: (res: Team) => {
          this.team = res;
          this.idTeam = res.id;
          this.productTeam.emit(res);
        }
      })
    }
  }

  /*
    Get the users of the team of this product
  */ 
  getUsersTeam():void{
    this.hasTeam = true;
    this.teamFormationService.getByTeam(this.idTeam).subscribe({
      next: (res: User[]) => {
        this.usersTeam = res;
        if(this.usersTeam.length == 1){
          this.oneUserTeam = true;
        }else{
          this.oneUserTeam = false;
        }
      }
    })
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.getUsersTeam();
  }

  /*
    Image treatment
  */
  // selectedImage: any;
  // async onFileChanged(event: any): Promise<void>{
  //   this.selectedImage = event.target.files[0];
  //   this.selectedImage.arrayBuffer().then((resp: Iterable<number>) => {
  //     let ui8 = new Uint8Array(resp);
  //     console.log(ui8);
  //     let rawData = [...ui8];
  //     console.log(rawData);
  //     this.product.productPhoto = new Blob([new Uint8Array(rawData)], {type:'image/*'});
  //     // console.log(this.product.productPhoto);
  //   });
  // }

  /*
    Delete user from the team of this product
  */
  deleteFormationByUserAndTeam(idUser: number, idTeam: number): void {
    this.teamFormationService.deleteFormationByUserAndTeam(idUser, idTeam).subscribe({
      complete: () => {
        this.toastrService.success('User deleted!', 'Success');
        this.getUsersTeam();
        if(this.idProduct){
          this.getProduct();
        }
      }
    })
  }

  verifyCredentials():boolean{
    let aux = 0;
    this.usersTeam.forEach(user => {
      if(user.id == this.user.id){
        aux++;
      }
    })
    if(aux > 0){
      return true;
    }else{
      return false;
    }
  }

  getProduct():void{
    if (this.idProduct == 0) {
      this.hasTeam = false;
      this.product = <Product>{};
    }else{
      this.service.getById(+this.idProduct).subscribe({
        next: (res: Product) => {
          this.product = res;
          this.team = res.team;
          this.idTeam = res.team.id;
          this.hasTeam = true;
          this.teamFormationService.getByTeam(res.team.id).subscribe({
            next: (res: User[]) => {
              this.usersTeam = res;
              if(this.usersTeam.length == 1){
                this.oneUserTeam = true;
              }
            }
          })
        }
      });
    }
  }
  
  changeProductName(): void{
    this.changeTeamName = true;
  }

  updateTeamName():void{
    if(typeof(this.product.name) !== "undefined"){
      this.team.name = this.product.name;
      this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.teamService.update(this.loggedUser, this.team).subscribe({
        next: (res: Team) => {
          this.team = res;
          this.idTeam = res.id;
        }
      })
    }
  }
  
  submit(form: NgForm): void {

    /*
      Treating date to match the time zone and to have the correct format
    */
    
    let modified = Object.assign({}, this.product);
  
    let saDate = new Date(this.product.firstSA);
    saDate = new Date(saDate.getTime() + saDate.getTimezoneOffset() * 60 * 1000);
    modified.firstSA = saDate.toISOString();

    /*
      Treat firstUG if it exists
    */
    if(this.product.firstUG){
      let ugDate = new Date(this.product.firstUG);
      ugDate = new Date(ugDate.getTime() + ugDate.getTimezoneOffset() * 60 * 1000);

      modified.firstUG = ugDate.toISOString();
    }
    
    /*
      Treating checkbox value
    */
    if(typeof(modified.isODM1) === 'undefined'){
      modified.isODM1 = false;
    }

    if(this.changeTeamName == true){
      this.updateTeamName();
    }

    /*
      Assigning the team to the team on the product
    */
    modified.team = this.team;

    /*
      Image file treatment
    */
    // const uploadImageData = new FormData();
    // uploadImageData.append('imageFile', this.selectedImage);
    // console.log(this.product.productPhoto);

    /*
      Sending product for insert
    */
    this.service.insert(this.loggedUser, modified).subscribe({
      complete: () => {
        this.usersTeam = [];
        form.resetForm();
        this.toastrService.success('Product saved!', 'Success');
      }
    });
  }

  ngOnInit(): void {
    /*
      Establishing user credentials
    */
    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    if(this.loggedUser && this.loggedUser > 0){
      this.userService.getById(+this.loggedUser).subscribe({
        next: (res: User) => {
          this.user = res;
          /*
            Edit product treatment
          */
          const id = this.route.snapshot.queryParamMap.get('id');
          if (id) {
            this.idProduct = +id;
            this.getProduct();
          }
        }
      })
    }

    /*
      Select and Modal need initialization
    */
    const options = {};

    const select = document.querySelectorAll('select');
    M.FormSelect.init(select, options);

    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal, options);

    const tooltip = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltip, options); 

    this.getFamily();
    this.getChipset();
    this.getStatus();

    /*
      Field valitation
    */

    let validate = new JustValidate("#product-form")

    validate
    .addField("#name", [
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ])
    .addField("#broadband-select",[
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ])
    .addField("#product-family-select",[
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ])
    .addField("#life-cycle-select",[
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ])
    .addField("#first-sa",[
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ])
    .addField("#gpd-lead",[
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ])
    .addField("#npi-lead",[
      {
        rule: 'required' as Rules,
        errorMessage: "This field cannot be empty"
      }
    ])
  }

}
