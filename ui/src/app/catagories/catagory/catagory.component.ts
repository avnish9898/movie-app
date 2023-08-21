import { Component, OnInit } from '@angular/core';
import { DataFetchService } from 'src/app/data-fetch.service';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.scss'],
})
export class CatagoryComponent implements OnInit {
  catagories;
  constructor(private dataFetch: DataFetchService) {}
  ngOnInit(): void {
    this.dataFetch.getCatagories().subscribe((catagories) => {
      console.log(catagories);
      this.catagories = catagories['data'];
    });
  }
}
