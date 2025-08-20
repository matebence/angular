import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Alternative option via @ViewChild
  // <form (ngSubmit)="onSubmit()" #f="ngForm">
  @ViewChild('f') signupForm: NgForm;

  defaultQuestion: string = "teacher";
  genders: string[] = ["male", "female"];
  answer: string = "";
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }

  suggestUserName() {
    const suggestedName = 'Superuser';

    // Override the form as a whole
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });

    // Override parts of the form
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      }
    });
  }
  
  onSubmit() {
    console.log(this.signupForm);
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }

  // <form (ngSubmit)="onSubmit(f)" #f="ngForm">
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
}
