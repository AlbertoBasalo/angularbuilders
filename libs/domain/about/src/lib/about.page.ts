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
    title: 'This site is maintained by Alberto Basalo',
    subtitle: 'Advise, consulting and learning services by an Angular seasoned professional',
  };
  constructor(seo: SeoService) {
    seo.updateSeoTags({
      title: 'About Angular.Builders',
      description:
        'Advise, consulting and learning services by Alberto Basalo, an Angular seasoned professional',
      image: '',
      url: '',
    });
  }
}
