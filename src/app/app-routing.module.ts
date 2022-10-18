import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChipsetFormComponent } from './components/chipset-form/chipset-form.component';
import { ChipsetViewComponent } from './components/chipset-view/chipset-view.component';
import { DistModelFormComponent } from './components/dist-model-form/dist-model-form.component';
import { DistModelViewComponent } from './components/dist-model-view/dist-model-view.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PhoneCompanyFormComponent } from './components/phone-company-form/phone-company-form.component';
import { PhoneCompanyViewComponent } from './components/phone-company-view/phone-company-view.component';
import { PhoneFamilyFormComponent } from './components/phone-family-form/phone-family-form.component';
import { PhoneFamilyViewComponent } from './components/phone-family-view/phone-family-view.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductScopeFormComponent } from './components/product-scope-form/product-scope-form.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { RegionFormComponent } from './components/region-form/region-form.component';
import { RegionViewComponent } from './components/region-view/region-view.component';
import { ReportRequestComponent } from './components/report-request/report-request.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserViewComponent } from './components/user-view/user-view.component';



const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'chipset/form', component: ChipsetFormComponent},
  {path: 'chipset', component: ChipsetViewComponent},
  {path: 'company/form', component: PhoneCompanyFormComponent},
  {path: 'company', component: PhoneCompanyViewComponent},
  {path: 'region/form', component: RegionFormComponent},
  {path: 'region', component: RegionViewComponent},
  {path: 'family/form', component: PhoneFamilyFormComponent},
  {path: 'family', component: PhoneFamilyViewComponent},
  {path: 'model/form', component: DistModelFormComponent},
  {path: 'model', component: DistModelViewComponent},
  {path: 'user/form', component: UserFormComponent},
  {path: 'user', component: UserViewComponent},
  {path: 'product/form', component: ProductFormComponent},
  {path: 'product', component: ProductViewComponent},
  {path: 'scope/form', component: ProductScopeFormComponent},
  {path: 'report', component: ReportRequestComponent},
  // {path: 'navigation', component: NavigationComponent},
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
