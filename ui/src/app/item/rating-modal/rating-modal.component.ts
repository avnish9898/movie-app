import { Component, Input, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'rating-modal',
  styleUrls: ['./rating-modal.component.scss'],
  templateUrl: './rating-modal.component.html',
})
export class RatingModalComponent implements OnInit {
  modal: Boolean;
  @Input() item = {};
  @Input() comment: Object;
  rate: Number = 0;
  constructor(private itemService: ItemService) {}
  text = '';
  ngOnInit(): void {
    console.log(this.item, 'comment', this.comment);

    this.itemService.ratingBox.subscribe((val) => {
      console.log('rating modal');
      this.modal = val;
    });
    // if (this.comment != {}) {
    //   this.changeRating(this.comment['rating']);
    //   this.text = this.comment['comment'];
    // }
  }
  changeRating(count) {
    this.rate = count;
  }
  closeModal() {
    // event.stopPropogation();
    this.itemService.ratingBox.next(false);
  }
  submitReview() {
    this.itemService.submitReview(this.rate, this.text);
    this.closeModal();
  }
}
