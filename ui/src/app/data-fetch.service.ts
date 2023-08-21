import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { HomeService } from './home/home.service';

@Injectable({ providedIn: 'root' })
export class DataFetchService {
  constructor(private http: HttpClient) {}
  getMovies() {
    return this.http.get('http://localhost:9000/');
  }

  getCatagories() {
    return this.http.get('http://localhost:9000/catagories');
  }
  getGenre(genre: string) {
    return this.http.get(
      'http://localhost:9000/catagories/' + genre.toLowerCase()
    );
  }
  getTrend(trend: string) {
    return this.http.get('http://localhost:9000/trend/' + trend);
  }
  getType(type: string) {
    return this.http.get('http://localhost:9000/type/' + type);
  }
  getItem(id) {
    console.log(id);
    return this.http.get('http://localhost:9000/details/' + id);
  }
  getSearchItem(search) {
    return this.http.post('http://localhost:9000/search/' + search, {
      searchItem: search,
    });
  }
  getList(id) {
    return this.http.get('http://localhost:9000/watchlist/get/' + id);
  }
  addWatchlist(watchlist, id) {
    // let newList={...}
    return this.http.patch('http://localhost:9000/watchlist/add', {
      watchlist: watchlist,
      id,
    });
  }
  DeleteFromWatchlist(id, watchlist) {
    console.log(watchlist);
    return this.http.patch('http://localhost:9000/watchlist/delete', {
      id,
      watchlist,
    });
  }
  addRating(rating, comment, movieId, userId) {
    console.log(
      'rating ',
      rating,
      'movie id ',
      movieId,
      'comment',
      comment,
      'user id ',
      userId
    );

    return this.http.post('http://localhost:9000/rating', {
      rating,
      movieId,
      userId,
      comment,
    });
    // .subscribe((data) => {
    //   console.log('submit review data is ', data);
    // });
  }
  getComments(movieId) {
    return this.http.get('http://localhost:9000/comments/' + movieId);
  }
}
