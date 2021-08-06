import { GhRepo } from '@ab/data';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
