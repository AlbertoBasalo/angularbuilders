import { SeoService, TrackerStore } from '@ab/global';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  templateUrl: './contact.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  constructor(private service: ContactService, private tracker: TrackerStore, seo: SeoService) {
    seo.updateSeoTags({
      title: 'Get in contact',
      description:
        'I can help you building your app, and you can help everybody adding resources to this catalog.',
    });
  }

  onLeadSend(lead: unknown) {
    this.service.postLead$(lead).subscribe({
      next: () =>
        this.tracker.trackBusiness(
          'FORM_SENT',
          'Thanks for your interest. I will get in contact with you ASAP!'
        ),
      error: () => {},
    });
  }
}
