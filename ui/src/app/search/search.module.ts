import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';

const route: Routes = [
  { path: ':id', component: SearchComponent },
  { path: '', redirectTo: '/' },
];
@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, RouterModule.forChild(route)],
})
export class SearchModule {}
