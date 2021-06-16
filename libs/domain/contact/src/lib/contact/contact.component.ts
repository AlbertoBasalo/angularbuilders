import { ABValidators } from '@ab/form';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'ab-contact',
  templateUrl: './contact.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  form!: FormGroup;

  @Output() send = new EventEmitter<any>();
  header = {
    heroClass: 'is-warning',
    title: 'Contact us',
    subtitle:
      'We can help you building your app, and you can help everybody adding resources to this catalog.',
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      interest: new FormControl('', [Validators.maxLength(50)]),
      region: new FormControl('', [Validators.maxLength(50)]),
      isHuman: new FormControl('Yes', [
        Validators.required,
        ABValidators.includes('Yes'),
      ]),
    });
  }

  onSubmit() {
    const lead = { ...this.form.value };
    delete lead.isHuman;
    this.send.next(lead);
  }
}
