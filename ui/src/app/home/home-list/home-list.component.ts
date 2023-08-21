import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WatchListService } from 'src/app/watchlist/watchlist.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {
  @Input() data;
  @Input() catagory;
  @Input() linkName;
  mainData;
  currentPage = 0;
  auth = false;

  constructor(
    private router: Router,
    private watchlistService: WatchListService
  ) {}
  addToWatchlist(item) {
    this.watchlistService.addToWatchlist(item);
  }
  openItem(id) {
    this.router.navigate(['/item', id]);
  }
  ngOnInit(): void {
    let start = this.currentPage;
    let end = this.currentPage + 5;
    this.mainData = this.data.slice(start, end);
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

    this.mainData = this.data.slice(this.currentPage, end);
  }
  nextSlide() {
    this.currentPage =
      this.currentPage + 5 < this.data.length ? this.currentPage + 5 : 0;
    let end = this.currentPage + 5;

    // console.log('start ' + this.currentPage + ' end ' + end);

    this.mainData = this.data.slice(this.currentPage, end);
  }
}
