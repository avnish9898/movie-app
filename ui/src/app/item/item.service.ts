import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { DataFetchService } from '../data-fetch.service';

@Injectable({ providedIn: 'root' })
export class ItemService {
  item = new BehaviorSubject<any>(null);
  ratingBox = new BehaviorSubject<Boolean>(false);
  allComments = new BehaviorSubject<any>([]);
  user = {};
  constructor(
    private dataFetch: DataFetchService,
    private authService: AuthenticationService
  ) {
    this.authService.user.subscribe((userData) => {
      console.log(userData);
      this.user = userData;
    });
  }
  setItem(id) {
    return this.dataFetch.getItem(id).subscribe((data) => {
      console.log(data['data']);
      this.item.next(data['data']);
    });
  }
  openRatingBox() {
    return this.ratingBox.next(true);
  }
  closeRatingBox() {
    return this.ratingBox.next(false);
  }
  submitReview(rate, comment) {
    return this.dataFetch
      .addRating(rate, comment, this.item.getValue()['id'], this.user['userId'])
      .subscribe((data) => {
        this.allComments.next(data);
      });
  }
  getComments(id) {
    return this.dataFetch.getComments(id).subscribe((comments) => {
      console.log('allComments', comments);
      this.allComments.next(comments['data']);
    });
  }
}
