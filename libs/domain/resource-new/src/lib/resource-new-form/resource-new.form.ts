import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CourseForm } from '../course-form/course.form';
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
  @ViewChild(CourseForm, { static: true }) courseSubForm!: CourseForm;

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
      course: this.courseSubForm.buildGroup(),
    });
  }
  onSubmit() {
    this.send.next(this.form.value);
  }
}
