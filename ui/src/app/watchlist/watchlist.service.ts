import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { DataFetchService } from '../data-fetch.service';

@Injectable({ providedIn: 'root' })
export class WatchListService {
  watchlist = [];
  list = {};
  userId = null;
  constructor(
    private datafetch: DataFetchService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.user.subscribe((user) => {
      console.log(user);
      if (user) {
        this.userId = user['userId'];
      }
    });
  }

  watchListChange = new BehaviorSubject<any>(null);

  getWatchList() {
    return this.watchlist.slice();
  }
  getUserId() {
    return this.userId;
  }
  addToWatchlist(item) {
    let newItem = this.watchlist.find((obj) => {
      return obj['id'] == item['id'];
    });

    if (this.userId) {
      if (!newItem) {
        this.watchlist.push(item);

        this.datafetch
          .addWatchlist(this.watchlist, this.userId)
          .subscribe((watchl) => {
            console.log(watchl);
          });
        this.watchListChange.next(this.watchlist.slice());
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  deleteWatchlist(id) {
    let newWatchlist = this.watchlist.filter((obj) => {
      return obj['id'] != id;
    });

    this.watchlist = newWatchlist;
    this.datafetch
      .DeleteFromWatchlist(this.userId, this.watchlist)
      .subscribe((wathlist) => {});
    this.watchListChange.next(this.watchlist.slice());
  }
  getWatchListFromServer() {
    this.datafetch
      .getList(this.userId)
      .pipe(
        map((data) => {
          return data['data']['list'];
        })
      )
      .subscribe((list) => {
        this.list = list;
        this.watchlist = list['watchlist'];

        this.watchListChange.next(this.watchlist);
      });
  }
}
