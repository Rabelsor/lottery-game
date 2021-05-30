import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public translate: TranslateService) {
    this.translate.use(this.translate.getBrowserLang());
  }


  lotteryBallSelected(event) {
    console.log(event);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
