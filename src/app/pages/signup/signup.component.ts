import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

// custom user interface
interface User {
  uid: string;
  email: string;
  displayName: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  get formValue() {
    return this.signupForm.controls;
  }

  createAccount() {
    this.submitted = true;
    this.error = null;
    console.log('Clicked');
    if (this.signupForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.authService.signupNewUser(
      {uid: '', email: this.formValue.email.value, displayName: this.formValue.name.value, emailVerified: false}, this.formValue.password.value)
      .then(user => {
            this.router.navigate(['dashboard']);
      })
      .catch(err => {
        this.error = err.message;
        this.resetForm();
      });

  }

  resetForm() {
    // this.loginForm.reset();
    this.signupForm.controls.password.reset();
    this.submitted = false;
  }


}
