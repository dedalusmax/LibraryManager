import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;

  constructor(private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    const credentials = {
      'username': form.value.username,
      'password': form.value.password
    }

    this._http.post("https://localhost:5001/Auth/Login", credentials)
      .subscribe(response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.router.navigate(['']);
      }), err => {
        this.invalidLogin = true;
      }
  }

}
