import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CorouselListComponent } from './list/list.component';
import { ShortendPipe } from './pipes/shortend.pipe';

@NgModule({
  declarations: [CorouselListComponent, ShortendPipe],
  imports: [CommonModule, RouterModule],
  exports: [CorouselListComponent, ShortendPipe],
})
export class SharedModule {}
