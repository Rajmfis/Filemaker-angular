import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Form Validation';
   angForm: FormGroup;
   constructor(private fb: FormBuilder) {
    this.createForm();
  }
  OnSubmit(){
    console.log(this.angForm);
  }
   createForm() {
    this.angForm = this.fb.group({
       id: ['', Validators.required ],
       pwd: ['', Validators.required ]
    });
    
  }
}