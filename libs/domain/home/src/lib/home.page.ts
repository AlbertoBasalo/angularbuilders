import { TrackerStore } from '@ab/global';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  categories$ = this.service.getCategories$();

  header = {
    heroClass: 'is-primary',
    title: 'The home of the Angular Builders',
    subtitle: 'A site to help you build great applications with Angular',
  };

  constructor(private service: HomeService, private tracker: TrackerStore) {}

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
