import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ab-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  @Input() set initial(value: string) {
    if (this.searchInput && !!value) {
      this.searchInput.nativeElement.value = value;
    }
  }
  @Output() search = new EventEmitter<string>();

  onInputKeyUp() {
    this.search.next(this.searchInput.nativeElement.value);
  }

  @ViewChild('searchInput') searchInput!: ElementRef;
}
