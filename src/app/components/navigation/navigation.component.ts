import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

interface SideNavToggle {
  collapsed: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) {}

  user: User = <User>{};

  menuToggle = false;

  toggleMenu() {
    this.menuToggle = !this.menuToggle;
  }

  toggleMenuOff() {
    if (this.menuToggle) {
      this.menuToggle = !this.menuToggle;
    }
  }

  @Output() onSideNavToggle: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onSideNavToggle.emit({ collapsed: this.collapsed });

    // var els = document.querySelectorAll('.tooltipped'),
    //   i;

    // for (i = 0; i < els.length; i++) {
    //   els[i].classList.remove('tooltipped');
    //   els[i].classList.add('teste');
    // }
  }

  toggleSideNavOff() {
    this.collapsed = false;
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onSideNavToggle.emit({ collapsed: this.collapsed });
  }

  getAuthUser(id: number): void {
    if(id > 0){
      this.userService.getById(id).subscribe({
        next: (res: User) => {
          if(res.hasOwnProperty('id')){
            this.user = res;
          }else{
            this.router.navigate(['/login']);
          }
        },
      });
    }else{
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.loginService.logout();
  }

  ngOnInit(): void {
    const userId: number = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.getAuthUser(userId);

    const tooltip = document.querySelectorAll('.tooltipped');
    const options = {};
    M.Tooltip.init(tooltip, options);

    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav, options);
  }
}
