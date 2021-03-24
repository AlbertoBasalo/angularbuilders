import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ab-ui-panel',
  templateUrl: './panel.template.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelTemplate implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
