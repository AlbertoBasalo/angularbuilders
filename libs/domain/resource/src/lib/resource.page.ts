import { Header } from '@ab/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Resource } from './models/resource';
import { ResourceService } from './resource.service';
@Component({
  templateUrl: './resource.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcePage implements OnInit {
  private header = {
    heroClass: 'is-primary',
    title: 'Category',
    subtitle: 'loading...',
  };

  header$ = new BehaviorSubject<Header>(this.header);
  resource$!: Observable<Resource>;

  constructor(
    private route: ActivatedRoute,
    private service: ResourceService
  ) {}

  ngOnInit(): void {
    const resourceId = this.route.snapshot.params.id;
    this.header$.next({ ...this.header, title: resourceId });
    this.resource$ = this.service.getResourceById$(resourceId).pipe(
      tap((resource) =>
        this.header$.next({
          ...this.header,
          title: resource.name,
          subtitle: resource.description,
        })
      )
    );
  }
}
