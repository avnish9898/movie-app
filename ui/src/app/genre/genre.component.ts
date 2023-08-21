import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetchService } from 'src/app/data-fetch.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  genreName;
  genreData = [];
  constructor(
    private dataFetch: DataFetchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      console.log(param['id']);
      this.genreName = param['id'];
    });
    this.dataFetch.getGenre(this.genreName).subscribe((genre) => {
      console.log(genre);
      this.genreData = genre['data'];
    });
  }
}
