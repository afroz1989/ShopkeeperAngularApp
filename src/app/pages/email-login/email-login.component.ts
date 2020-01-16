import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css']
})
export class EmailLoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private fireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  get formValue() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    console.log('Login clicked');
    if (this.loginForm.invalid) {
      return;
    }
    this.fireAuth.auth.signInWithEmailAndPassword(this.formValue.email.value, this.formValue.password.value)
      .then(success => {
        console.log('Login success');
        this.router.navigateByUrl('/dashboard');
      })
      .catch(err => {
        console.error('Error ', err);
        this.error = this.convertMessage(err.code);
        this.resetForm();
      });
  }

  resetForm() {
    //this.loginForm.reset();
    this.loginForm.controls['password'].reset();
    this.submitted = false;
  }

  convertMessage(code: string): string {
    switch (code) {
      case 'auth/user-disabled': {
        return 'Sorry your user is disabled.';
      }
      case 'auth/user-not-found': {
        return 'Sorry user not found.';
      }
      case 'auth/wrong-password': {
        return 'Invalid email or password.';
      }
      default: {
        return 'Login error try again later.';
      }
    }
  }
}
