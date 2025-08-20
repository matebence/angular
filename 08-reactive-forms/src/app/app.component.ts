import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.frobiddenEmails]),  // Async validator added here
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });


    this.signupForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );

    this.signupForm.statusChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );

    this.signupForm.setValue({
      'userData': {
        'username': "Bence",
        'email': 'bence@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    
    this.signupForm.setValue({
      'userData': {
        'username': "Bence",
        'email': 'bence@test.com'
      }
    });
  }

  onSubmit(): void {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control)
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  frobiddenEmails(control: AbstractControl): Observable<ValidationErrors | null> {
    // Simulate async operation (e.g., HTTP request)
    const takenEmails = ['test@test.com', 'admin@domain.com'];
    
    // Simulate a delay like an HTTP call
    return of(control.value).pipe(
      delay(2000),  // Simulate a delay (2 seconds)
      map(email => {
        if (takenEmails.includes(email)) {
          return { 'emailTaken': true };  // Error if email is taken
        }
        return null;  // No error if email is available
      }),
      catchError(() => of(null))  // In case of any error (e.g., HTTP failure), return null
    );
  }

  get email() {
    return this.signupForm.get('userData.email') as FormControl;
  }

  get hobbiesControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  get username() {
    return this.signupForm.get('userData.username') as FormControl;
  }
}
