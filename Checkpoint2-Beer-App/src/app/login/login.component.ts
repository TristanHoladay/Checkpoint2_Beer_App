import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  error: any;
  loading: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit(loginData) {
    if (this.loginform.invalid) {
      return;
    }

    this.authService
      .login(loginData.email, loginData.password)
      .pipe(first())
      .subscribe(
        data => { 
          this.router.navigateByUrl("userprofile");
        },
        error => {
          console.log(error);
        }
      );
      console.log("logged in!");
  }

}
