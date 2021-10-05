import { SeoService } from '@ab/global';
import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  templateUrl: './not-found.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  constructor(seo: SeoService) {
    seo.updateSeoTags({
      title: 'Not Found Page',
      description: '404 Page not found',
    });
  }
}
