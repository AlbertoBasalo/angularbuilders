import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../models/category';

@Component({
  selector: 'ab-resource-new-form',
  templateUrl: './resource-new.form.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceNewForm implements OnInit {
  form!: FormGroup;
  @Input() categories: Category[] = [];
  @Output() send = new EventEmitter<any>();

  header = {
    heroClass: 'is-warning',
    title: 'Add a new resource',
    subtitle: 'Help us complete the Angular Builders Catalog.',
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      categoryId: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.minLength(3)]),
      url: new FormControl(''),
      price: new FormControl(0),
    });
  }
  onSubmit() {
    this.send.next(this.form.value);
  }
}
