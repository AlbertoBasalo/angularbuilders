import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ab-login',
  templateUrl: './login.form.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginForm implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
