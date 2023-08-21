import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataFetchService } from '../data-fetch.service';
import { HomeService } from './home.service';
@Injectable({ providedIn: 'root' })
export class HomeResolverService implements Resolve<any> {
  constructor(private homeService: HomeService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.homeService.getDataFromServer();
  }
}
