import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'ab-ui-card',
  templateUrl: './card.template.html',
  styles: [
    `
      article {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      footer {
        /* margin-top: auto; */
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTemplate {
  @Input() card: Card = { title: '', description: '' };
  constructor() {}
}
