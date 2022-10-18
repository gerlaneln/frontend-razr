import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuToggle = false;

  toggleMenu() {
    this.menuToggle = !this.menuToggle;
  }

  toggleMenuOff() {
    if (this.menuToggle) {
      this.menuToggle = !this.menuToggle;
    }
  }
}
