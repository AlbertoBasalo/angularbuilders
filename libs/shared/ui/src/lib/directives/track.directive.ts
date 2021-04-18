import { TrackerStore } from '@ab/global';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[abUiTrack]',
})
export class TrackDirective {
  @Input('abUiTrack') label?: string;
  @HostListener('click') onClick() {
    this.trackUserInteraction('CLICK');
  }
  constructor(private el: ElementRef, private tracker: TrackerStore) {}

  private trackUserInteraction(action: string) {
    this.tracker.trackBusiness('CLICK', this.getLabel());
  }
  private getLabel() {
    if (this.label) return this.label;
    const native = this.el.nativeElement;
    return (
      native.id || native.name || native.value || native.innerHTML || 'unknown'
    );
  }
}
