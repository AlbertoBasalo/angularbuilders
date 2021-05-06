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
  getCardFrom(repo: GhRepo) {
    return {
      title: '👨‍💻 ' + (repo.homepage || repo.description),
      href: repo.homepage || repo.html_url,
    };
  }
}
