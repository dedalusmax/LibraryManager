import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

lang: string;

constructor(private router: Router) { }

ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'en';
    console.log(localStorage.getItem('lang'));
}

customerRoute(){
  this.router.navigate(['customer']);
}

booksRoute(){
  this.router.navigate(['book']);
}

changeLang(lang) {
  localStorage.setItem('lang', lang);
  window.location.reload();
}

}
