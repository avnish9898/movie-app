import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetchService } from '../data-fetch.service';
import { WatchListService } from '../watchlist/watchlist.service';
import { ItemService } from './item.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: {} = {};
  comments: [] = [];
  user = {};
  comment = {};
  constructor(
    private itemService: ItemService,
    private watchlistService: WatchListService
  ) {}
  ngOnInit(): void {
    this.user = this.itemService.user;
    this.itemService.item.subscribe((item) => {
      console.log(item);
      this.item = item;
    });
    this.itemService.allComments.subscribe((comments) => {
      console.log('all comments in item', comments);
      this.comments = comments;
      let comment = comments.find((obj) => {
        return (
          this.user != {} &&
          obj['userId'] == this.user['userId'] &&
          obj['movieId'] == this.item['id']
        );
      });
      console.log('comment ', comment, 'user ', this.user);

      this.comment = comment != undefined && comment;
    });
  }

  addWatchList(item) {
    this.watchlistService.addToWatchlist(item);
  }
  openRatingModal() {
    console.log('clicked rating modal');
    this.itemService.ratingBox.next(true);
  }
}
