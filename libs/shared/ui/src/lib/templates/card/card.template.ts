import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'ab-ui-card',
  templateUrl: './card.template.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTemplate {
  @Input() card: Card = { title: '', description: '' };
  constructor() {}
}
