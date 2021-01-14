import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'library-app';
  lang: string;

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    this.lang = localStorage.getItem('lang') || 'en';
    this.translateService.use(this.lang);
  }
}
