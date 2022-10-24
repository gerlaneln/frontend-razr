import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChartComponent } from './components/chart/chart.component';
import { HomeComponent } from './components/home/home.component';
import { ClickOusideDirective } from './directives/click-ouside.directive';
import { ChipsetFormComponent } from './components/chipset-form/chipset-form.component';
import { ChipsetViewComponent } from './components/chipset-view/chipset-view.component';
import { PhoneCompanyFormComponent } from './components/phone-company-form/phone-company-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PhoneCompanyViewComponent } from './components/phone-company-view/phone-company-view.component';
import { RegionViewComponent } from './components/region-view/region-view.component';
import { RegionFormComponent } from './components/region-form/region-form.component';
import { PhoneFamilyFormComponent } from './components/phone-family-form/phone-family-form.component';
import { PhoneFamilyViewComponent } from './components/phone-family-view/phone-family-view.component';
import { DistModelViewComponent } from './components/dist-model-view/dist-model-view.component';
import { DistModelFormComponent } from './components/dist-model-form/dist-model-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { TeamViewComponent } from './components/team-view/team-view.component';
import { LifeCycleStatusFormComponent } from './components/life-cycle-status-form/life-cycle-status-form.component';
import { ProductScopeFormComponent } from './components/product-scope-form/product-scope-form.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeFormComponent } from './components/upgrade-form/upgrade-form.component';
import { InsertTeamUsersComponent } from './components/insert-team-users/insert-team-users.component';
import { ReportRequestComponent } from './components/report-request/report-request.component';
import { UsersTeamViewComponent } from './components/users-team-view/users-team-view.component';
import { UpgradeProductViewComponent } from './components/upgrade-product-view/upgrade-product-view.component';
import { ScopeProductViewComponent } from './components/scope-product-view/scope-product-view.component';
import { UserTeamDeleteComponent } from './components/user-team-delete/user-team-delete.component';
import { ProductHistoryComponent } from './components/product-history/product-history.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SidenavComponent,
    NavbarComponent,
    HomeComponent,
    ChartComponent,
    ClickOusideDirective,
    ChipsetFormComponent,
    ChipsetViewComponent,
    PhoneCompanyFormComponent,
    NavigationComponent,
    PhoneCompanyViewComponent,
    RegionViewComponent,
    RegionFormComponent,
    PhoneFamilyFormComponent,
    PhoneFamilyViewComponent,
    DistModelViewComponent,
    DistModelFormComponent,
    UserFormComponent,
    UserViewComponent,
    ProductViewComponent,
    ProductFormComponent,
    TeamViewComponent,
    LifeCycleStatusFormComponent,
    ProductScopeFormComponent,
    TeamFormComponent,
    UpgradeFormComponent,
    InsertTeamUsersComponent,
    ReportRequestComponent,
    UsersTeamViewComponent,
    UpgradeProductViewComponent,
    ScopeProductViewComponent,
    UserTeamDeleteComponent,
    ProductHistoryComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
