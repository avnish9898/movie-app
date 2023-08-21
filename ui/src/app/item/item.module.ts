import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataFetchService } from '../data-fetch.service';
import { SharedModule } from '../Shared/shared.module';
import { ItemResolver } from './item-resolver.service';
import { ItemComponent } from './item.component';
import { RatingModalComponent } from './rating-modal/rating-modal.component';
const route: Routes = [
  {
    path: ':id',
    component: ItemComponent,
    resolve: { item: ItemResolver },
  },
];
@NgModule({
  declarations: [ItemComponent, RatingModalComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(route),
  ],
})
export class ItemModule {}
