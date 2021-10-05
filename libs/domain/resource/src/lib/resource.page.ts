import { Resource } from '@ab/data';
import { SeoService } from '@ab/global';
import { Header } from '@ab/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
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

  constructor(
    private route: ActivatedRoute,
    private service: ResourceService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    const resourceId = this.route.snapshot.params.id;
    this.header$.next({ ...this.header, title: resourceId });
    this.resource$ = this.service.getResourceById$(resourceId).pipe(
      switchMap((resource) => this.service.refreshResourceExternalData$(resource)),
      tap((resource) => this.updateHeaders(resource))
    );
  }

  private updateHeaders(resource: Resource) {
    this.header$.next({
      ...this.header,
      title: resource.name,
      subtitle: resource.description,
    });
    this.seo.updateSeoTags({
      title: resource.name,
      description: resource.description,
      image: resource.gitHub?.owner.avatar_url,
      url: 'https://angular.builders/resource/' + this.route.snapshot.url[0],
    });
  }
}
