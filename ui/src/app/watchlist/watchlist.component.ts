import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { WatchListService } from './watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  watchlist = [];
  constructor(
    private watchlistService: WatchListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.watchlistService.watchListChange.subscribe((change) => {
      this.watchlist = change;
      console.log(this.watchlist);
    });
    this.watchlist = this.watchlistService.getWatchList();
  }
  onItemDetail(id) {
    this.router.navigate(['/item', id]);
  }
  onDelete(id) {
    this.watchlistService.deleteWatchlist(id);
  }
}
