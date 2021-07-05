import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GhRepo } from '../models/gh-repo';

@Component({
  selector: 'ab-github',
  templateUrl: './github.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubComponent {
  @Input() ghRepo!: GhRepo;
  constructor() {}
  getCard() {
    return {
      title: this.ghRepo.owner.login + '/' + this.ghRepo.name,
    };
  }
}
