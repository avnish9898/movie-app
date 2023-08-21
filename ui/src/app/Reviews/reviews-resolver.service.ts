import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { ItemService } from '../item/item.service';
@Injectable({ providedIn: 'root' })
export class ReviewsResolver implements Resolve<any> {
  constructor(private itemService: ItemService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.params['id'];
    console.log(id);

    this.itemService.setItem(id);
    this.itemService.getComments(id);
  }
}
