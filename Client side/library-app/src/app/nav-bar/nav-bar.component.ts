import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

public lang: string;

constructor(private router: Router) { }

ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'en';
    console.log(localStorage.getItem('lang'));
}

public customerRoute(): void{
  this.router.navigate(['customer']);
}

public booksRoute(): void{
  this.router.navigate(['book']);
}

public changeLang(lang: string): void {
  localStorage.setItem('lang', lang);
  window.location.reload();
}

}
