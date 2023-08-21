import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { MenuService } from '../menu/menu.service';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user = null;
  watchist = 0;
  searchItem = '';
  dropdown = false;
  constructor(
    private authService: AuthenticationService,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;

      this.watchist = user.list;
    });
    console.log(this.searchItem);
  }
  signout() {
    this.authService.signout();
    this.dropdown = false;
    this.router.navigate(['/']);
  }
  clickMenu() {
    const menu = this.menuService.menuStatus.value;
    this.menuService.menuStatus.next(!menu);
  }
  clickSearch() {
    this.menuService.searchService.next(this.searchItem);
    this.router.navigate(['/search', this.searchItem]);
  }
  clickDropdown() {
    this.dropdown = !this.dropdown;
  }
}
