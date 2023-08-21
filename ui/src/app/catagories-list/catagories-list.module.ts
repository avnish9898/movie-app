import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CatagoriesListComponent } from './catagories-list.component';
const route: Routes = [{ path: ':id', component: CatagoriesListComponent }];
@NgModule({
  declarations: [CatagoriesListComponent],
  imports: [CommonModule, RouterModule.forChild(route)],
})
export class CatagoriesListModule {}
