import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';

import { HomeListComponent } from './home-list/home-list.component';
import { HomeResolverService } from './home-resolver.service';
import { HomeComponent } from './home.component';

const route: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { homeData: HomeResolverService },
  },
];
@NgModule({
  declarations: [HomeComponent, HomeListComponent],
  imports: [SharedModule, CommonModule, RouterModule.forChild(route)],
})
export class HomeModule {}
