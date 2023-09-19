import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  lang: any = 'en';
  constructor(private translate: TranslateService) {
    this.lang = this.translate.currentLang;
  }
  changeLanguage() {
    if (this.lang == 'en') {
      localStorage.setItem('language', 'ar');
    } else {
      localStorage.setItem('language', 'en');
    }
    window.location.reload();
  }
  logout() {
    localStorage.removeItem('token');
  }
}
