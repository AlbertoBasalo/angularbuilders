import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'ab-ui-card',
  templateUrl: './card.template.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTemplate implements OnInit {
  @Input() card: Card = { title: '', description: '' };
  constructor() {}

  ngOnInit(): void {}
}
