import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';
import { debounceTime, distinctUntilChanged } from 'rxjs';


export function convertDate(dateString: string): string {

  if (dateString) {
    const month = dateString.slice(0, 2);
    const day = dateString.slice(2, 4);
    const year = dateString.slice(4, 8);
    // const hour = dateString.slice(8, 10);


    const formattedDate = `${month}/${day}/${year}`;
    const date = new Date(formattedDate);

    if (isNaN(date.getTime())) {
      return '';
    }
    else {
      return formattedDate;
    }
  }

  else {
    return '';
  }


}

export function validateDate(control: AbstractControl): ValidationErrors | null {
  const dateString = control.value;
  const formattedDate = convertDate(dateString);
  const date = new Date(formattedDate);

  console.log(dateString);
  console.log(date);
  console.log(isNaN(date.getTime()));
  if (isNaN(date.getTime())) {
    return { invalidDate: true };
  }

  return null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-data-formatter';

  date: string = '01042023';
  form!: FormGroup;
  formattedDate!: string;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      date: [this.date, [validateDate]]
    });

    this.formattedDate = convertDate(this.date);

    this.form.get('date')?.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe((value) => {
      this.formattedDate = convertDate(value);
    });
  }



}
