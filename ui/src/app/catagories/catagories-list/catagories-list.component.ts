import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataFetchService } from 'src/app/data-fetch.service';

@Component({
  selector: 'app-catagories-list',
  templateUrl: './catagories-list.component.html',
  styleUrls: ['./catagories-list.component.scss'],
})
export class CatagoriesListComponent implements OnInit {
  heading: string;
  data = [];
  poster: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataFetch: DataFetchService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.heading = params['id'];
      this.dataFetch.getTrend(this.heading).subscribe((data) => {
        console.log(data);
        this.heading = this.heading.replace('-', ' ');
        this.data = data['data'];
        this.poster = data['poster'];
        console.log(this.data);
      });
    });
  }
}
