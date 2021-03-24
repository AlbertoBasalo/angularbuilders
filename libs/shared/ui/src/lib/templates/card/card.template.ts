import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ab-ui-card',
  templateUrl: './card.template.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTemplate implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
