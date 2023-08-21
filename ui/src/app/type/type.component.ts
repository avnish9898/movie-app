import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFetchService } from 'src/app/data-fetch.service';
import { CatagoriesListComponent } from '../catagories-list/catagories-list.component';
import { TypeService } from './type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
})
export class TypeComponent implements OnInit, OnDestroy {
  typeName: string;
  homeData = {};
  index = 0;
  interval = null;
  constructor(
    private route: ActivatedRoute,
    private dataFetch: DataFetchService,
    private router: Router,
    private typeService: TypeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param['id'] == 'series' || param['id'] == 'movie') {
        this.typeName = param['id'];
        this.dataFetch.getType(this.typeName).subscribe((data) => {
          this.homeData = data['data'];
          this.typeService.typeData.next(this.homeData);
        });
      } else {
        this.router.navigate(['/']);
      }
    });
    this.interval = setInterval(() => {
      this.index =
        this.index < this.homeData['poster'].length - 1 ? this.index + 1 : 0;
    }, 3000);
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
