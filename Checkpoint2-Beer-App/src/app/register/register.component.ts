import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: IUser;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit(user) {
    this.authService.register(user).subscribe(user => {
      this.newUser = user; 
      if (user) this.router.navigateByUrl("login");
    });
  }
}
