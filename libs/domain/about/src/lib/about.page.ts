import { SeoService } from '@ab/global';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './about.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  header = {
    heroClass: 'is-primary',
    title: 'This site is maintained by Angular.Builders',
    subtitle: 'Advise, consulting and learning services by Angular seasoned professionals',
  };
  constructor(seo: SeoService) {
    seo.updateSeoTags({
      title: 'About Angular.Builders',
      description: 'Advise, consulting and learning services by Angular seasoned professionals',
      image: '',
      url: '',
    });
  }
}
