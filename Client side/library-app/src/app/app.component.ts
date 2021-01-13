import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'library-app';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    const lang = localStorage.getItem('lang') || 'en';
    this.translateService.use(lang);
  }
}
