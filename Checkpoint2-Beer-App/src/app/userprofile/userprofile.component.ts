import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { IUserProfile } from '../interfaces/iuserprofile';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: IUser;
  userProfile: IUserProfile;
  edit: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      "picURL": [''],
      "dob": [''],
      "address": [''],
      "favFood": [''],
      "favMovie": [''],
      "favArtist": [''],
      "interests": ['']
    });
    this.authService.User.subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
    console.log(this.authService.currentUserValue);

    window.alert("You need to fill out your profile!");
  }

  onSubmit(profile: any) {
    console.log("Submit Successful. Send Data to Database");
    console.log(profile);
    this.edit = false;
  }

  logout() {
    this.authService.logout;
    window.alert("goodbye");
    this.router.navigateByUrl("login");
  }

}
