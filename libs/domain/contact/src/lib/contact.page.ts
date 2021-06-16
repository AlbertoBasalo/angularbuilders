import { TrackerStore } from '@ab/global';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  templateUrl: './contact.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  constructor(private service: ContactService, private tracker: TrackerStore) {}

  onLeadSend(lead: unknown) {
    this.service.postLead$(lead).subscribe({
      next: () =>
        this.tracker.trackBusiness(
          'FORM_SENT',
          'Thanks for your interest. We will get in contact with you ASAP!'
        ),
      error: () => {},
    });
  }
}
