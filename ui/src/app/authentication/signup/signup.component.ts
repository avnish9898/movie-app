import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('signup') signup;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}
  onSubmit() {
    const email = this.signup.value.email;
    const password = this.signup.value.password;
    const name = this.signup.value.name;
    this.authService.signup(name, email, password).subscribe((user) => {
      console.log(user);
    });
    this.signup.reset();
  }
}
