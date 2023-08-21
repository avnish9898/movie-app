import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from './home.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HttpClient],
})
export class HomeComponent implements OnInit, OnDestroy {
  data = {};
  subscription: Subscription;
  timer = 0;
  timeout = null;
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.data = this.homeService.getAllData();
    this.subscription = this.homeService.changeData.subscribe((newData) => {
      this.data = newData;
    });
    this.timeout = setInterval(() => {
      this.timer =
        this.timer == this.data['poster'].length - 1 ? 0 : this.timer + 1;
    }, 4000);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearInterval(this.timeout);
  }
}
