import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreComponent } from './genre.component';

const route: Routes = [{ path: ':id', component: GenreComponent }];
@NgModule({
  declarations: [GenreComponent],
  imports: [CommonModule, RouterModule.forChild(route)],
})
export class GenreModule {}
