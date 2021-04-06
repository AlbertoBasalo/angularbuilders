import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ab-promo',
  templateUrl: './promo.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoComponent implements OnInit {
  header = {
    heroClass: 'is-info',
    title: 'Promo by Angular.Builders',
    subtitle:
      'Advise, consulting and learning services by Angular seasoned professionals',
  };
  constructor() {}

  ngOnInit(): void {}
}
