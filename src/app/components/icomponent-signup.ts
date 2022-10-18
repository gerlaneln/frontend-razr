import { NgForm } from "@angular/forms";

export interface IcomponentSignup<R> {

  register: R;

  submit(form: NgForm): void;
}
