import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

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
  constructor(private formBuilder: FormBuilder, private router: Router, private fireAuth: AngularFireAuth, private fs: AngularFirestore) { }

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
    console.log('Clicked');
    if (this.signupForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.fireAuth.auth.createUserWithEmailAndPassword(this.formValue.email.value, this.formValue.password.value)
      .then(user => {
          console.log('Success', user);
          const userRef: AngularFirestoreDocument<User> = this.fs.doc(`users/${user.user.uid}`);
          const data: User = {
            uid: user.user.uid,
            email: user.user.email || null,
            displayName: this.formValue.name.value
          };
          userRef.set(data).then(res => {
            this.router.navigate(['dashboard']);
          });
      })
      .catch(err => {
        this.error = err.message;
        this.resetForm();
      });

  }

  resetForm() {
    //this.loginForm.reset();
    this.signupForm.controls['password'].reset();
    this.submitted = false;
  }


}
