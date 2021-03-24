import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './home.page.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
