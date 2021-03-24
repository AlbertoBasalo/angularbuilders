import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ab-form-control',
  templateUrl: './control.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
