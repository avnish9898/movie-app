import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user = new BehaviorSubject<any>(null);
  private tokenExpirationTime: any;
  constructor(private http: HttpClient) {}
  isAuthenticated() {
    if (this.user == null) {
      return false;
    } else {
      return true;
    }
  }
  login(email, password) {
    return this.http
      .post('http://localhost:9000/login', { email, password })
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        tap((res) => {
          this.handleAuth(res['user']);
        })
      );
  }
  handleAuth(user) {
    console.log(user);
    const newUser = {
      userId: user._id,
      name: user.name,
      email: user.email,
      tokenId: user._token,
      list: user.list,
    };

    localStorage.setItem('authUser', JSON.stringify(newUser));
    this.user.next(newUser);
  }

  autologin() {
    const user = JSON.parse(localStorage.getItem('authUser'));
    console.log(user);
    if (user) {
      this.user.next(user);
    }
  }
  signup(name, email, password) {
    return this.http.post('http://localhost:9000/signup', {
      name,
      email,
      password,
    });
  }
  updateUser(id, name) {
    return this.http
      .patch('http://localhost:9000/updateUser', { id, name })
      .pipe(
        tap((user) => {
          this.handleAuth(user['user']);
        })
      );
  }
  signout() {
    localStorage.removeItem('authUser');
    this.user.next(null);
  }
}
