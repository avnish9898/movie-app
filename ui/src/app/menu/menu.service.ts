import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  menuStatus = new BehaviorSubject<boolean>(false);
  searchService = new BehaviorSubject<string>('');
  openMenu() {}
  dropDownStatus = new BehaviorSubject<boolean>(false);
}
