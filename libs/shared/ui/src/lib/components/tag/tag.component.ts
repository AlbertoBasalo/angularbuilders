import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tag } from '../../models/tag';

@Component({
  selector: 'ab-ui-tag',
  templateUrl: './tag.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent implements OnChanges {
  private defaultTag = { caption: '', statusClass: 'is-info', value: '', units: '' };
  @Input() tag: Partial<Tag> = { ...this.defaultTag };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tag) {
      this.tag = { ...this.defaultTag, ...changes.tag.currentValue };
    } else {
      this.setDefaultTag();
    }
  }

  private setDefaultTag() {
    this.tag = { ...this.defaultTag };
  }
}
