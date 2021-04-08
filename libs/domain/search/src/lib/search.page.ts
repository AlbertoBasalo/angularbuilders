import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Resource } from './models/resource';
import { SearchService } from './search.service';

@Component({
  templateUrl: './search.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage implements OnInit {
  resources$!: Observable<Resource[]>;
  queryTerm = '';
  constructor(private route: ActivatedRoute, private service: SearchService) {}

  ngOnInit(): void {
    this.resources$ = this.route.queryParamMap.pipe(
      map((params) => params.get('q') || ''),
      tap((query) => (this.queryTerm = query)),
      switchMap((query) => this.service.getResourceByQuery$(query))
    );
  }
}
