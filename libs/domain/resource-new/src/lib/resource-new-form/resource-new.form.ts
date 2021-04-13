import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ab-resource-new-form',
  templateUrl: './resource-new.form.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceNewForm implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
