import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './about.page.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
