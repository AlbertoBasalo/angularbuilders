import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'ab-lead',
  templateUrl: './lead.form.html',
  styleUrls: [],
})
export class LeadForm implements OnInit {
  form!: FormGroup;

  @Output() send = new EventEmitter<any>();
  header = {
    heroClass: 'is-warning',
    title: 'We can help you',
    subtitle: 'Contact us.',
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
      isHuman: new FormControl('Yes', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.value.isHuman) {
      const lead = { ...this.form.value };
      delete lead.isHuman;
      this.send.next(lead);
    }
  }
}
