import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

lang: string;

constructor() { }

ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'en';
    console.log(localStorage.getItem('lang'));
}

changeLang(lang) {
  localStorage.setItem('lang', lang);
  window.location.reload();
}

}
