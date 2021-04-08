import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ab-search-box-widget',
  templateUrl: './search-box.widget.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxWidget implements OnInit {
  initial = '';
  private current = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((params) => params.get('q') || ''),
        filter((q) => this.initial !== q && this.current !== q)
      )
      .subscribe((q) => {
        this.initial = q;
        this.cdr.markForCheck();
      });
  }

  onSearch(searchTerm: string): void {
    // ToDo: use an observable with from event
    if (this.current === searchTerm) return;
    this.current = searchTerm;
    if (searchTerm.length >= 2) {
      this.router.navigate(['search'], {
        queryParams: { q: searchTerm },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate(['']);
    }
  }
}
