import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDetails: {} = {};
  editProfile = false;
  name = '';
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      console.log(user);
      this.userDetails = user;
      this.name = user['name'];
    });
  }
  openEdit() {
    this.editProfile = true;
  }
  closeEdit() {
    this.editProfile = false;
  }
  submit() {
    console.log(this.name);
    this.authService
      .updateUser(this.userDetails['userId'], this.name)
      .subscribe((user) => {
        console.log('inside submit profiilse', user);

        this.userDetails['name'] = user['user']['name'];
      });
  }
}
