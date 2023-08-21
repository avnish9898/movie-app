import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CatagoriesService } from 'src/app/catagories/catagories.service';
import { WatchListService } from 'src/app/watchlist/watchlist.service';

@Component({
  selector: 'app-corousel-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class CorouselListComponent implements OnInit {
  data;

  @Input() linkName;
  @Input() url;
  mainData;
  currentPage = 0;
  animationName = '';

  constructor(
    private catagoriesService: CatagoriesService,
    private watchlistService: WatchListService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    let start = this.currentPage;
    let end = this.currentPage + 5;
    this.catagoriesService.typeData.subscribe((data) => {
      this.data = data[this.linkName];
      this.mainData = this.data.slice(start, end);
      console.log('start ' + start + ' end ' + end);
    });
  }
  prevousSlide() {
    this.currentPage =
      this.currentPage - 5 < 0
        ? this.data.length - (this.data.length % 5)
        : // this.data.length - this.currentPage
          this.currentPage - 5;
    let end =
      this.currentPage - 5 <= 0
        ? this.currentPage + 5
        : this.currentPage + (this.data.length % 5);
    console.log('prevous slide start ' + this.currentPage + ' end ' + end);

    this.mainData = this.data.slice(this.currentPage, end);
    this.animationName = 'right';
  }
  nextSlide() {
    this.currentPage =
      this.currentPage + 5 < this.data.length ? this.currentPage + 5 : 0;
    let end = this.currentPage + 5;

    // console.log('start ' + this.currentPage + ' end ' + end);

    this.mainData = this.data.slice(this.currentPage, end);
    this.animationName = 'left';
  }
  addWatchList(data) {
    console.log('inside list components', data);
    this.watchlistService.addToWatchlist(data);
  }
}
