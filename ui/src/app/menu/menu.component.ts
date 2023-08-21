import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuStatus = false;
  catagoryStatus = false;
  user = null;
  constructor(
    private menuService: MenuService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.menuService.menuStatus.subscribe((status) => {
      this.menuStatus = status;
    });
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
  openSubMenu() {
    this.catagoryStatus = !this.catagoryStatus;
  }
}
