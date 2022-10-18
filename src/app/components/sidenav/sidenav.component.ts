import { Component, EventEmitter, OnInit, Output} from '@angular/core';

interface SideNavToggle{
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() onSideNavToggle: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onSideNavToggle.emit({collapsed: this.collapsed});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onSideNavToggle.emit({collapsed: this.collapsed});
  }
  toggleSideNavOff(){
    this.collapsed = false;
  }

}
