import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { trigger, transition, animate, style, keyframes } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideInLeft', [
      
      transition('void => *', [
        animate('2000ms ease-in', keyframes([
          style({ transform: 'translateX(-1000px)', opacity: 0, offset: 0}),
          style({ transform: 'translateX(0px)', opacity: 1, offset: 1})
        ]))
      ])
    ]),
    trigger('slideInRight', [
      
      transition('void => *', [
        animate('2000ms ease-in', keyframes([
          style({ transform: 'translateX(1000px)', opacity: 0, offset: 0}),
          style({ transform: 'translateX(0px)', opacity: 1, offset: 1})
        ]))
      ])
    ]),
    trigger('fadeIn', [
      
      transition('void => *', [
        animate('2000ms ease-in', keyframes([
          style({ opacity: 0, offset: 0}),
          style({ opacity: 1, offset: 1})
        ]))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  public invalidLogin: boolean;

  constructor(private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    const inputs: NodeListOf<Element> = document.querySelectorAll('.input');

    function addcl(){
      let parent: any = this.parentNode.parentNode;
      parent.classList.add('focus');
    }

    function remcl(){
      let parent: any = this.parentNode.parentNode;
      if(this.value == ''){
        parent.classList.remove('focus');
      }
    }


    inputs.forEach(input => {
      input.addEventListener('focus', addcl);
      input.addEventListener('blur', remcl);
    });
      }

  public login(form: NgForm): void {
    const credentials: { username:string, password:string } = {
      'username': form.value.username,
      'password': form.value.password
    };

    this._http.post('https://localhost:5001/Auth/Login', credentials)
      .subscribe(response => {
        const token: any = (<any>response).token;
        localStorage.setItem('jwt', token);
        this.invalidLogin = false;
        this.router.navigate(['book']);
      }), err => {
        this.invalidLogin = true;
      };
  }

}
