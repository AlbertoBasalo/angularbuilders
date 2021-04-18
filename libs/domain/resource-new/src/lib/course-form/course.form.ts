import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ab-course-form',
  templateUrl: './course.form.html',
  styles: [],
})
export class CourseForm {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  buildGroup() {
    this.form = this.fb.group({
      date: new FormControl(''),
      teacher: new FormControl(''),
      academy: new FormControl(''),
    });
    return this.form;
  }
}
