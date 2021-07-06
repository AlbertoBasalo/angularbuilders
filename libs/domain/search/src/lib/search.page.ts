import { Resource } from '@ab/data';
import { SeoService } from '@ab/global';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SearchService } from './search.service';

@Component({
  templateUrl: './search.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage implements OnInit {
  resources$!: Observable<Resource[]>;
  queryTerm = '';
  constructor(
    private route: ActivatedRoute,
    private service: SearchService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.resources$ = this.route.queryParamMap.pipe(
      map((params) => params.get('q') || ''),
      tap((query) => {
        this.queryTerm = query;
        this.seo.updateSeoTags({
          title: '? q = ' + query,
          description: 'Searching for ' + query,
          image: '',
          url: '',
        });
      }),
      switchMap((query) => this.service.getResourceByQuery$(query))
    );
  }
}
