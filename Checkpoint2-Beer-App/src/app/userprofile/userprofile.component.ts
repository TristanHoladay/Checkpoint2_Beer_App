import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: IUser;
  edit: boolean;
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      picURL: new FormControl(),
      dob: new FormControl(),
      address: new FormControl(),
      favFood: new FormControl(),
      favMovie: new FormControl(),
      favArtist: new FormControl(),
      interests: new FormControl()
    });
    this.user = this.authService.currentUserValue;
  }

}
