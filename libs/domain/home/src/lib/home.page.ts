import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  categories$ = this.service.getCategories$();
  isOk$ = new BehaviorSubject<boolean>(false);
  isError$ = new BehaviorSubject<boolean>(false);
  header = {
    heroClass: 'is-primary',
    title: 'The home of the Angular Builders',
    subtitle: 'A place to share, get help and learn',
  };

  constructor(private service: HomeService) {}

  onLeadSend(lead: any) {
    this.service.postLead$(lead).subscribe({
      next: () => this.isOk$.next(true),
      error: () => this.isError$.next(true),
    });
  }
}
