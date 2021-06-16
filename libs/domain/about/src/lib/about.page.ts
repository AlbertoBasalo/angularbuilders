import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './about.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  header = {
    heroClass: 'is-info',
    title: 'This site is maintained by Angular.Builders',
    subtitle:
      'Advise, consulting and learning services by Angular seasoned professionals',
  };
  constructor() {}
}
