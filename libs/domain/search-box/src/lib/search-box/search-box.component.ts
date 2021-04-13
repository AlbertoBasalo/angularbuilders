import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'ab-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements AfterViewInit, OnDestroy {
  @Input() set initial(value: string) {
    if (this.searchInput && !!value) {
      this.searchInput.nativeElement.value = value;
    }
  }
  @Output() search = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  private inputSubscription!: Subscription;

  ngAfterViewInit(): void {
    this.inputSubscription = fromEvent<{ target: { value: unknown } }>(
      this.searchInput.nativeElement,
      'keyup'
    )
      .pipe(
        map((event) => event.target.value),
        map((value) => value as string),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => this.search.next(searchTerm));
  }

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
  }
}
