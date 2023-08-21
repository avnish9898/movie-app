import { Component, OnInit } from '@angular/core';

import { ItemService } from '../item/item.service';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  item = {};
  comments = [];
  constructor(private itemService: ItemService) {}
  ngOnInit(): void {
    this.itemService.item.subscribe((data) => {
      console.log(data);
      this.item = data;
    });
    this.itemService.allComments.subscribe((comments) => {
      console.log(comments);
      this.comments = comments;
    });
  }
}
