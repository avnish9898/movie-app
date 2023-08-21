import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('login') login;
  error = '';
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log('login', this.login);
    const email = this.login.value.email;
    const password = this.login.value.password;
    this.authService.login(email, password).subscribe(
      (data) => {
        console.log(data);
        if (data['user'] != null) {
          this.router.navigate(['/']);
          this.error = '';
        } else {
          let errorMessage =
            data['errors'].email !== ''
              ? data['errors'].email
              : data['errors'].password;
          this.error = errorMessage;
          console.log(errorMessage);
        }
      },
      (error) => {
        console.log(error);
        this.error = error;
      }
    );
    this.login.reset();
  }
}
