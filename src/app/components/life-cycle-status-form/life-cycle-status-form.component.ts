import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LifeCycleStatus } from 'src/app/models/life-cycle-status.model';
import { LifeCycleStatusService } from 'src/app/services/life-cycle-status.service';
import JustValidate from 'just-validate';
import { Rules } from 'just-validate/dist/modules/interfaces';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-life-cycle-status-form',
  templateUrl: './life-cycle-status-form.component.html',
  styles: [],
})

export class LifeCycleStatusFormComponent implements OnInit {
  constructor(
    private service: LifeCycleStatusService,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  status: LifeCycleStatus = <LifeCycleStatus>{};
  loggedUser: number = 0;
  user: User = <User>{};

  getUser(): void{
    /*
      Get the teams that are assigned to that user
    */
    this.userService.getById(JSON.parse(sessionStorage.getItem('user') || '{}')).subscribe({
      next: (res: User) => {
        this.user = res;
      }
    })
  }

  /*
    The submit function also checks what user is logged, so the backend can assign the changes on the log
  */
  submit(form: NgForm): void {
    if (this.status.id) {
      this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.service.update(this.loggedUser, this.status).subscribe({
        complete: () => {
          form.resetForm();
          this.toastrService.success('Life cycle edited!', 'Success');
        },
      });
    } else {
      this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.service.insert(this.loggedUser, this.status).subscribe({
        complete: () => {
          form.resetForm();
          this.toastrService.success('Life cycle assigned!', 'Success');
        },
      });
    }
  }

  ngOnInit(): void {
    /*
      Field validation
    */

    let validate = new JustValidate('life-cycle-form');

    validate.addField('#life-cycle-name', [
      {
        rule: 'required' as Rules,
        errorMessage: 'This field cannot be empty',
      },
    ]);
  }
}
