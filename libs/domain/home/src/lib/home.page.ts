import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  categories$ = this.service.getCategories$();
  showSentContact$ = new BehaviorSubject<boolean>(false);

  constructor(private service: HomeService) {}

  ngOnInit(): void {}

  onLeadSend(lead: any) {
    this.service
      .postLead$(lead)
      .pipe()
      .subscribe({ next: () => this.showSentContact$.next(true) });
  }
}
