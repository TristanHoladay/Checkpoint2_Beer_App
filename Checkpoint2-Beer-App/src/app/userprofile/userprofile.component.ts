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
      picURL: new FormControl(),
      dob: new FormControl('03/14/1990'),
      address: new FormControl(),
      favFood: new FormControl(),
      favMovie: new FormControl(),
      favArtist: new FormControl(),
      interests: new FormControl()
    });
    this.user = this.authService.currentUserValue;
    console.log(this.user.firstName);

    window.alert("You need to fill out your profile!");
  }

  onSubmit(profile: any) {
    console.log("Submit Successful. Send Data to Database");
    this.edit = false;
    this.userProfile.DOB = profile.FormControl.dob;
    this.userProfile.homeAddress = profile.FormControl.homeAddress;
  }

  logout() {
    this.authService.logout;
    window.alert("goodbye");
    this.router.navigateByUrl("login");
  }

}
