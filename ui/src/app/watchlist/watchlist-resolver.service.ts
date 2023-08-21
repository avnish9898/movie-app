import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { WatchListService } from './watchlist.service';

@Injectable({ providedIn: 'root' })
export class WatchListResolver implements Resolve<any> {
  constructor(private watchlist: WatchListService, private http: HttpClient) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.watchlist.getWatchListFromServer();
  }
}
