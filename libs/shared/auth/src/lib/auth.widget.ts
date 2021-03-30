import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ab-auth',
  templateUrl: './auth.widget.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthWidget implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
