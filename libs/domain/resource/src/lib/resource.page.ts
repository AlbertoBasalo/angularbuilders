import { Resource } from '@ab/data';
import { SeoService } from '@ab/global';
import { Header } from '@ab/ui';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GhRepo } from './models/gh-repo';
import { NpmRegistry } from './models/npm-registry';
import { ResourceService } from './resource.service';
@Component({
  templateUrl: './resource.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcePage implements OnInit {
  private header = {
    heroClass: 'is-info',
    title: 'Category',
    subtitle: 'loading...',
  };

  header$ = new BehaviorSubject<Header>(this.header);
  resource$!: Observable<Resource>;
  ghRepo$!: Observable<GhRepo>;
  npmRegistry$!: Observable<NpmRegistry | undefined>;
  noCode$!: Observable<Resource>;
  constructor(
    private route: ActivatedRoute,
    private service: ResourceService,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const resourceId = this.route.snapshot.params.id;
    this.header$.next({ ...this.header, title: resourceId });
    this.resource$ = this.service
      .getResourceById$(resourceId)
      .pipe(tap((resource) => this.getDataForResource(resource)));
  }
  private getDataForResource(resource: Resource) {
    if (resource.url.startsWith('https://github.com/')) {
      this.codeResource(resource);
    } else {
      this.noCode$ = of(resource).pipe(tap((resource) => this.updateResourceWithGH(resource)));
    }
  }

  private codeResource(resource: Resource) {
    if (isPlatformBrowser(this.platformId)) {
      this.ghRepo$ = this.service.getGitHubRepoByRepoUrl(resource.url).pipe(
        tap((ghRepo) => this.updateResourceWithGH(resource, ghRepo)),
        tap(() => {
          this.npmRegistry$ = this.service
            .getNpmRegistryByName(
              (resource.gitHub as GhRepo)?.owner.login + ' ' + resource.name,
              resource.url
            )
            .pipe(tap((npm) => this.updateResourceWithNpm(resource, npm)));
        })
      );
    } else {
      this.ghRepo$ = of(resource.gitHub as GhRepo);
      this.npmRegistry$ = of(resource.npm as NpmRegistry);
      this.seo.updateSeoTags({
        title: resource.name,
        description: resource.description,
        image: (resource.gitHub as GhRepo).owner.avatar_url || '',
        url: 'https://angular.builders/resource/' + this.route.snapshot.url[0],
      });
    }
  }
  updateResourceWithNpm(resource: Resource, npm: NpmRegistry): void {
    resource.npm = {
      package: {
        name: npm.package.name,
        description: npm.package.description,
        version: npm.package.version,
        date: npm.package.date,
        keywords: npm.package.keywords,
        links: npm.package.links,
        author: npm.package.author,
        publisher: npm.package.publisher,
      },
      score: npm.score,
    };
    this.service.updateResource$(resource).subscribe();
  }

  private updateResourceWithGH(resource: Resource, ghRepo?: GhRepo) {
    this.header$.next({
      ...this.header,
      title: resource.name,
      subtitle: resource.description,
    });
    resource.gitHub = {
      name: ghRepo?.name,
      full_name: ghRepo?.full_name,
      html_url: ghRepo?.html_url,
      description: ghRepo?.description,
      updated_at: ghRepo?.updated_at,
      stargazers_count: ghRepo?.stargazers_count,
      subscribers_count: ghRepo?.subscribers_count,
      homepage: ghRepo?.homepage,
      language: ghRepo?.language,
      owner: {
        login: ghRepo?.owner.login,
        html_url: ghRepo?.owner.html_url,
        avatar_url: ghRepo?.owner.avatar_url,
      },
    };
    this.seo.updateSeoTags({
      title: resource.name,
      description: resource.description,
      image: (resource.gitHub as GhRepo).owner.avatar_url || '',
      url: 'https://angular.builders/resource/' + this.route.snapshot.url[0],
    });
  }
}
