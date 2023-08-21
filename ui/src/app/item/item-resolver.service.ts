import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataFetchService } from '../data-fetch.service';
import { ItemComponent } from './item.component';
import { ItemService } from './item.service';
@Injectable({ providedIn: 'root' })
export class ItemResolver implements Resolve<any> {
  constructor(private itemService: ItemService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.params['id'];
    console.log(id);

    this.itemService.setItem(id);
    this.itemService.getComments(id);
  }
}
