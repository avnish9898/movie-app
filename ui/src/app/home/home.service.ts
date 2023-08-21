import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataFetchService } from '../data-fetch.service';

@Injectable({ providedIn: 'root' })
export class HomeService {
  data = {};
  constructor(private dataFetch: DataFetchService) {}
  changeData = new BehaviorSubject<any>(null);
  getAllData() {
    return this.data;
  }
  setAllData(newData) {
    this.data = newData;
    this.changeData.next(this.data);
  }
  getDataFromServer() {
    this.dataFetch.getMovies().subscribe((data) => {
      this.data = data['data'];
      this.changeData.next(this.data);
    });
  }
}
