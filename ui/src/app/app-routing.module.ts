import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeResolverService } from './home/home-resolver.service';
import { HomeComponent } from './home/home.component';

import { ItemComponent } from './item/item.component';
import { SearchComponent } from './search/search.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { WatchListResolver } from './watchlist/watchlist-resolver.service';
import { ProfileComponent } from './profile/profile.component';
import { TypeComponent } from './type/type.component';
import { CatagoryComponent } from './catagory/catagory.component';
import { GenreComponent } from './genre/genre.component';
import { CatagoriesListComponent } from './catagories-list/catagories-list.component';
import { AuthGaurd } from './authentication/auth-gaurd.service';
import { ReviewsComponent } from './Reviews/reviews.component';
import { ReviewsResolver } from './Reviews/reviews-resolver.service';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'type',
    loadChildren: () => import('./type/type.module').then((m) => m.TypeModule),
  },
  {
    path: 'catagory',
    loadChildren: () =>
      import('./catagory/catagory.module').then((m) => m.CatagoryModule),
  },
  {
    path: 'genre',
    loadChildren: () =>
      import('./genre/genre.module').then((m) => m.GenreModule),
  },
  {
    path: 'catagorieslist',
    loadChildren: () =>
      import('./catagories-list/catagories-list.module').then(
        (m) => m.CatagoriesListModule
      ),
  },

  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'item',
    component: ItemComponent,
    loadChildren: () => import('./item/item.module').then((m) => m.ItemModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'watchlist',
    canActivate: [AuthGaurd],
    component: WatchlistComponent,
    resolve: [WatchListResolver],
  },
  {
    path: 'profile',
    canActivate: [AuthGaurd],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'item/:id/reviews',
    component: ReviewsComponent,
    resolve: [ReviewsResolver],
  },
  { path: '**', redirectTo: '/' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
