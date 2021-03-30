import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ab-services',
  templateUrl: './services.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit {
  header = {
    heroClass: 'is-info',
    title: 'Services by Angular.Builders',
    subtitle:
      'Advise, consulting and learning services by Angular seasoned professionals',
  };
  constructor() {}

  ngOnInit(): void {}
}
