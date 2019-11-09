import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/user';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser>;
  private currentUser: Observable<IUser>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  public get User(): Observable<IUser> {
    return this.currentUser;
  }

  register(user: any): Observable<IUser> {
    return this.http.post<IUser>(
      "https://localhost:44367/api/auth/register",
      user
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<any>("https://localhost:44367/api/auth/login", {email: email, password: password})
      .pipe(
        map(user => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          return user;
        })
    );
  };

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
